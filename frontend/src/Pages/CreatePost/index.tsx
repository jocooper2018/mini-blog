import './index.css';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Post, User } from '../..';
import PostEditor from '../../Components/PostEditor';
import { useCreatePostMutation } from '../../graphql';
import { gql, Reference } from '@apollo/client';

interface CreatePostProps {
  loggedUser: User | undefined;
}

export default function CreatePost(props: CreatePostProps) {
  const [postTitle, setPostTitle] = useState<string>('');
  const [postContent, setPostContent] = useState<string>('');

  const [createPost] = useCreatePostMutation({
    update(cache, { data }) {
      if (!data?.createPost) return;
      const newPostRef = cache.writeFragment({
        data: data.createPost,
        fragment: gql`
          fragment NewPost on Post {
            id
            authorId
            title
            content
            published
            createdAt
            updatedAt
          }
        `,
      });
      if (!newPostRef) return;
      cache.modify({
        fields: {
          getManyPost(existingPosts: readonly Reference[] = []) {
            return [newPostRef, ...existingPosts];
          },
        },
      });
    },
  });

  const navigate = useNavigate();

  const handleCreatePost = async (): Promise<void> => {
    if (!props.loggedUser) return;
    const queryResult = await createPost({
      variables: {
        createPostDto: {
          authorId: props.loggedUser?.id,
          title: postTitle,
          content: postContent,
        },
      },
    });
    if (!queryResult.data?.createPost) return;
    const postCreated: Post = queryResult.data.createPost;
    navigate(`/post/${postCreated.id}`);
  };

  return !props.loggedUser ? (
    <Navigate to="" />
  ) : (
    <main className="create-post-page">
      <h1>Créer un post</h1>
      <PostEditor
        type="create"
        postTitle={postTitle}
        setPostTitle={setPostTitle}
        postContent={postContent}
        setPostContent={setPostContent}
        handleSubmit={handleCreatePost}
      />
    </main>
  );
}
