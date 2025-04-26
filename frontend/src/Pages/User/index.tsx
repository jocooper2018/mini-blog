import './index.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Post, User } from '../..';
import formatDate from '../../utils/formatDate';
import PostList from '../../Components/PostList';
import isUser from '../../utils/isUser';
import { useGetManyPostLazyQuery, useGetOneUserByIdLazyQuery, useLogOutMutation } from '../../graphql';

interface UserPageProps {
  loggedUser: User | undefined;
  setLoggedUser: (value: User | undefined) => void;
}

function UserPage(props: UserPageProps) {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [user, setUser] = useState<User>();
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  const [getOneUserById] = useGetOneUserByIdLazyQuery();
  const [getManyPost] = useGetManyPostLazyQuery();
  const [fetchLogOut] = useLogOutMutation();

  const handleFetch: () => Promise<void> = async (): Promise<void> => {
    if (!userId) return;
    const userQueryResult = await getOneUserById({ variables: { id: parseInt(userId) } });
    if (!userQueryResult.data?.getOneUserById) {
      return;
    }
    const user: User = userQueryResult.data?.getOneUserById;
    setUser(user);

    const postsQueryResult = await getManyPost({ variables: { authorId: parseInt(userId) } });
    if (!postsQueryResult.data?.getManyPost) {
      return;
    }
    const posts: Post[] = postsQueryResult.data.getManyPost;
    setUserPosts(posts);
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

  return (
    <main className="user-page">
      {myAccount ? (
        <div>
          <h1>Mon Compte</h1>
          <button type="button" onClick={handleLogOut}>
            Se déconnecter
          </button>
        </div>
      ) : (
        <h1>Détails de l'utilisateur</h1>
      )}
      <h2>{user?.username}</h2>
      {myAccount ? (
        <>
          <div>
            <span>Email&nbsp;: </span>
            <span>{user?.email}</span>
          </div>
          <div>
            <span>Date de création&nbsp;: </span>
            {user ? <span>{formatDate(new Date(user.createdAt))}</span> : null}
          </div>
        </>
      ) : (
        <></>
      )}
      <PostList postList={userPosts} />
    </main>
  );
}

export default UserPage;
