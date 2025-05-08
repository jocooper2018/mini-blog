import './index.css';
import { JSX, useEffect, useState } from 'react';
import { Comment, Post, User } from '../..';
import {
  useDeleteCommentMutation,
  useGetOnePostByIdLazyQuery,
  useGetOneUserByIdLazyQuery,
} from '../../graphql';
import { Link } from 'react-router-dom';
import ContextualMenu from '../ContextualMenu';

interface CommentComponentProps {
  loggedUser: User | undefined;
  comment: Comment;
  linkTo?: 'post' | 'author';
}

export default function CommentComponent(
  props: CommentComponentProps,
): JSX.Element {
  const [author, setAuthor] = useState<User | undefined>(undefined);
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [getAuthor] = useGetOneUserByIdLazyQuery();
  const [getPost] = useGetOnePostByIdLazyQuery();
  const [deleteComment] = useDeleteCommentMutation();

  const handleGetAuthor = async () => {
    const queryResult = await getAuthor({
      variables: { id: props.comment.authorId },
    });
    if (!queryResult.data?.getOneUserById) {
      return;
    }
    setAuthor(queryResult.data.getOneUserById);
  };

  const handleGetPost = async () => {
    const queryResult = await getPost({
      variables: { id: props.comment.postId },
    });
    if (!queryResult.data?.getOnePostById) {
      return;
    }
    setPost(queryResult.data.getOnePostById);
  };

  const handleDeleteComment = async () => {
    const queryResult = await deleteComment({
      variables: { commentId: props.comment.id },
      update(cache) {
        const normalizedId = cache.identify({
          id: props.comment.id,
          __typename: 'Comment',
        });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    });
    if (!queryResult.data?.deleteComment) {
      return;
    }
  };

  useEffect(() => {
    (async () => {
      if (props.linkTo === 'post') {
        await handleGetPost();
      } else {
        await handleGetAuthor();
      }
    })();
  }, []);

  return (
    <article className="comment">
      {props.loggedUser?.id === props.comment.authorId ? (
        <ContextualMenu
          actions={[
            {
              name: 'Supprimer',
              function: handleDeleteComment,
              confirmMessage: 'Voulez-vous vraiment supprimer ce commentaire ?',
            },
          ]}
        />
      ) : null}
      <h3>{props.comment.title}</h3>
      {props.linkTo === 'post' ? (
        <Link to={`/post/${post?.id}`}>{post?.title}</Link>
      ) : (
        <Link to={`/user/${author?.id}`}>{author?.username}</Link>
      )}
      <p>{props.comment.content}</p>
    </article>
  );
}
