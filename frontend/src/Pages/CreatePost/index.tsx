import './index.css';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Post, User } from '../..';
import PostEditor from '../../Components/PostEditor';
import { useCreatePostMutation } from '../../graphql';

interface CreatePostProps {
  loggedUser: User | undefined;
}

export default function CreatePost(props: CreatePostProps) {
  const [postTitle, setPostTitle] = useState<string>('');
  const [postContent, setPostContent] = useState<string>('');

  const [createPost] = useCreatePostMutation();

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
