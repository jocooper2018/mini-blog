import './index.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Post, User } from '../..';
import PostList from '../../Components/PostList';
import UserDataForm from '../../Components/UserDataForm';
import isUser from '../../utils/isUser';
import {
  useDeleteUserMutation,
  useGetManyPostLazyQuery,
  useGetOneUserByIdLazyQuery,
  useLogOutMutation,
  useUpdateUserMutation,
} from '../../graphql';
import Error404 from '../../Components/Error';
import Popup from '../../Components/Popup';
import { Reference } from '@apollo/client';

interface UserPageProps {
  loggedUser: User | undefined;
  setLoggedUser: (value: User | undefined) => void;
}

export default function UserPage(props: UserPageProps) {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [user, setUser] = useState<User>();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userExist, setUserExist] = useState<boolean>(true);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const [getOneUserById] = useGetOneUserByIdLazyQuery();
  const [getManyPost] = useGetManyPostLazyQuery();
  const [fetchLogOut] = useLogOutMutation();
  const [fetchUpdateUser] = useUpdateUserMutation();
  const [fetchDeleteUser] = useDeleteUserMutation();

  const handleFetchUser: () => Promise<void> = async () => {
    if (!userId) return;
    const userQueryResult = await getOneUserById({
      variables: { id: parseInt(userId) },
    });
    if (!userQueryResult.data?.getOneUserById) {
      setUserExist(false);
      return;
    }
    const _user: User = userQueryResult.data?.getOneUserById;
    setUser(_user);
  };

  const handleFetchPosts: () => Promise<void> = async () => {
    if (!userId) return;
    const postsQueryResult = await getManyPost({
      variables: { authorId: parseInt(userId) },
    });
    if (!postsQueryResult.data?.getManyPost) {
      return;
    }
    const posts: Post[] = postsQueryResult.data.getManyPost;
    setUserPosts(posts);
  };

  const handleFetch: () => Promise<void> = async (): Promise<void> => {
    await handleFetchUser();
    await handleFetchPosts();
  };

  const handleLogOut: () => Promise<void> = async (): Promise<void> => {
    const queryResult = await fetchLogOut();
    if (!queryResult.data?.logOut) {
      return;
    }
    props.setLoggedUser(undefined);
    navigate('/login');
  };

  useEffect((): void => {
    (async (): Promise<void> => {
      await handleFetch();
    })();
  }, [userId]);

  const myAccount: boolean | undefined =
    props.loggedUser &&
    isUser(props.loggedUser) &&
    props.loggedUser.id.toString() === userId;

  const handleUpdateUser = async (userData: {
    email: string;
    username: string;
    password: string;
  }): Promise<boolean> => {
    if (!userId) return false;
    if (!myAccount) return false;
    const updateUserQueryResult = await fetchUpdateUser({
      variables: {
        updateUserDto: {
          id: parseInt(userId),
          email: userData.email === '' ? undefined : userData.email,
          username: userData.username === '' ? undefined : userData.username,
          password: userData.password === '' ? undefined : userData.password,
        },
      },
    });
    if (!updateUserQueryResult.data?.updateUser) {
      await handleFetchUser();
      return false;
    }
    const updatedUser: User = updateUserQueryResult.data.updateUser;
    setUser(updatedUser);
    await handleFetch();
    return true;
  };

  const handleDeleteUser = async (): Promise<void> => {
    if (!user) return;
    const queryResult = await fetchDeleteUser({
      variables: { id: user.id },
      update(cache) {
        const normalizedUserId = cache.identify({
          id: user.id,
          __typename: 'User',
        });

        cache.modify({
          fields: {
            getManyPost(
              existingPostsRefs: readonly Reference[] = [],
              { readField },
            ) {
              return existingPostsRefs.filter(
                (postRef) => readField('authorId', postRef) !== user.id,
              );
            },
          },
        });

        cache.evict({ id: normalizedUserId });
        cache.gc();
      },
    });
    if (!queryResult.data?.deleteUser) {
      return;
    }
    setIsDeleted(true);
    props.setLoggedUser(undefined);
  };

  if (!userExist) {
    return <Error404 />;
  } else if (user) {
    return (
      <main className="user-page">
        {myAccount ? (
          <>
            <div>
              <h1>Mon Compte</h1>
              <button type="button" onClick={handleLogOut}>
                Se déconnecter
              </button>
            </div>
            <UserDataForm
              setLoggedUser={props.setLoggedUser}
              handleSubmit={handleUpdateUser}
              requiredFields={{
                email: false,
                username: false,
                password: false,
              }}
              submitMessage="Enregistrer les modifications"
              defaultValues={{
                email: props.loggedUser?.email,
                username: props.loggedUser?.username,
              }}
            />
          </>
        ) : (
          <>
            <h1>Détails de l'utilisateur</h1>
            <h2>{user?.username}</h2>
          </>
        )}
        <PostList postList={userPosts} />
        {myAccount ? (
          <Popup
            actionText="Supprimer le compte"
            class="delete"
            action={handleDeleteUser}
          >
            Voulez-vous vraiment supprimer le compte et tous ses posts&nbsp;?
          </Popup>
        ) : null}
        {isDeleted ? (
          <Popup
            noTrigger
            closeButton={
              <Link to="/" className="button">
                Retour à l'accueil
              </Link>
            }
          >
            L'utilisateur et tous ses posts ont été supprimés.
          </Popup>
        ) : null}
      </main>
    );
  } else {
    return <main className="loading" />;
  }
}
