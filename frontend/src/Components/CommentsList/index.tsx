import './index.css';
import { JSX, useEffect, useState } from 'react';
import { Comment, User } from '../..';
import { useGetManyCommentLazyQuery } from '../../graphql';
import CommentComponent from '../Comment';

interface CommentsListProps {
  loggedUser: User | undefined;
  postId?: number;
  authorId?: number;
  linkTo?: 'post' | 'author';
}

export default function CommentsList(props: CommentsListProps): JSX.Element {
  const [getComments, { data }] = useGetManyCommentLazyQuery();

  useEffect(() => {
    getComments({
      variables: {
        postId: props.postId,
        authorId: props.authorId,
      },
    });
  }, []);

  const commentsList: Comment[] = data?.getManyComment ?? [];

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
          <CommentComponent
            comment={comment}
            linkTo={props.linkTo}
            loggedUser={props.loggedUser}
          />
        </li>
      ))}
    </ul>
  );
}
