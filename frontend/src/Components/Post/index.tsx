import './index.css';
import { useState, useEffect } from 'react';
import { Post as PostType, User } from '../..';
import { Link } from 'react-router-dom';
import {
  useDeletePostMutation,
  useGetOneUserByIdLazyQuery,
} from '../../graphql';
import Popup from '../Popup';

interface PostProps {
  postData: PostType;
  link?: boolean;
  myPost?: boolean;
}

export default function Post(props: PostProps) {
  const { id, title, content, authorId } = {
    ...props.postData,
  };

  const [author, setAuthor] = useState<User>();
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const [getOneUserById] = useGetOneUserByIdLazyQuery();
  const [fetchDeletePost] = useDeletePostMutation();

  const handleFetchPosts: () => Promise<void> = async (): Promise<void> => {
    const queryResult = await getOneUserById({ variables: { id: authorId } });
    if (queryResult.data?.getOneUserById) {
      const user: User = queryResult.data.getOneUserById;
      setAuthor(user);
    }
  };

  const handleDeletePost: () => Promise<void> = async (): Promise<void> => {
    const queryResult = await fetchDeletePost({
      variables: { id: id },
      update(cache) {
        const normalizedId = cache.identify({ id: id, __typename: 'Post' });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    });
    if (!queryResult.data?.deletePost) {
      console.error('Error when deleting the post');
      return;
    }
    setIsDeleted(true);
  };

  useEffect((): void => {
    (async (): Promise<void> => {
      await handleFetchPosts();
    })();
  }, []);

  return (
    <article className="post">
      <div>
        <h2>
          {props.link ? <Link to={`/post/${id}`}>{title}</Link> : <>{title}</>}
        </h2>
        {!props.link && props.myPost ? (
          <Link to={`/post/${id}/update`} className="button">
            Modifier le post
          </Link>
        ) : null}
      </div>
      <div>
        <Link to={`/user/${author?.id}`}>{author?.username}</Link>
      </div>
      {props.link ? (
        <p>{`${content.substring(0, 253)}...`}</p>
      ) : (
        <p>{content}</p>
      )}
      {!props.link && props.myPost ? (
        <Popup
          actionText="Supprimer le post"
          class="delete"
          action={handleDeletePost}
        >
          Voulez-vous vraiment supprimer ce post ?<br />
          Cette action est irreversible.
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
          Le post à été supprimé
        </Popup>
      ) : null}
    </article>
  );
}
