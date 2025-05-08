import './index.css';
import { JSX, useEffect, useState } from 'react';
import { Comment, User } from '../..';
import { useGetOneUserByIdLazyQuery } from '../../graphql';
import { Link } from 'react-router-dom';

interface CommentComponentProps {
  comment: Comment;
}

export default function CommentComponent(
  props: CommentComponentProps,
): JSX.Element {
  const [author, setAuthor] = useState<User | undefined>(undefined);
  const [getAuthor] = useGetOneUserByIdLazyQuery();

  const handleGetAuthor = async () => {
    const queryResult = await getAuthor({
      variables: { id: props.comment.authorId },
    });
    if (!queryResult.data?.getOneUserById) {
      return;
    }
    setAuthor(queryResult.data.getOneUserById);
  };

  useEffect(() => {
    (async () => {
      await handleGetAuthor();
    })();
  }, []);

  return (
    <div className="comment">
      <h3>{props.comment.title}</h3>
      <Link to={`/user/${author?.id}`}>{author?.username}</Link>
      <p>{props.comment.content}</p>
    </div>
  );
}
