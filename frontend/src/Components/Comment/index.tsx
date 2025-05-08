import './index.css';
import { JSX, useEffect, useState } from 'react';
import { Comment, Post, User } from '../..';
import {
  useGetOnePostByIdLazyQuery,
  useGetOneUserByIdLazyQuery,
} from '../../graphql';
import { Link } from 'react-router-dom';

interface CommentComponentProps {
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
