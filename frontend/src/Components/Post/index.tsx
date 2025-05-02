import './index.css';
import { useState, useEffect } from 'react';
import { Post as PostType, User } from '../..';
import { Link } from 'react-router-dom';
import { useGetOneUserByIdLazyQuery } from '../../graphql';

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

  const [getOneUserById] = useGetOneUserByIdLazyQuery();

  const handleFetchPosts: () => Promise<void> = async (): Promise<void> => {
    const queryResult = await getOneUserById({ variables: { id: authorId } });
    if (queryResult.data?.getOneUserById) {
      const user: User = queryResult.data.getOneUserById;
      setAuthor(user);
    }
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
          <Link to={`/post/${id}/update`} className='button'>Modifier le post</Link>
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
    </article>
  );
}
