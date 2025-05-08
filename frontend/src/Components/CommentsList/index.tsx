import './index.css';
import { JSX, useEffect, useState } from 'react';
import { Comment } from '../..';
import { useGetManyCommentLazyQuery } from '../../graphql';
import CommentComponent from '../Comment';

interface CommentsListProps {
  postId?: number;
  authorId?: number;
  linkTo?: 'post' | 'author';
}

export default function CommentsList(props: CommentsListProps): JSX.Element {
  const [commentsList, setCommentsList] = useState<Comment[]>([]);

  const [getComments] = useGetManyCommentLazyQuery();

  const handleGetComment = async () => {
    const queryResult = await getComments({
      variables: {
        postId: props.postId,
        authorId: props.authorId,
      },
    });
    if (!queryResult.data?.getManyComment) {
      return;
    }
    setCommentsList(queryResult.data.getManyComment);
  };

  useEffect(() => {
    (async () => {
      await handleGetComment();
    })();
  }, []);

  if (commentsList.length === 0) {
    return (
      <div className="comment-list empty">
        <span>Aucuns commentaires</span>
      </div>
    );
  }

  return (
    <ul className="comment-list">
      {commentsList.map((comment: Comment) => (
        <li key={`comment-${comment.id}`}>
          <CommentComponent comment={comment} linkTo={props.linkTo} />
        </li>
      ))}
    </ul>
  );
}
