import './index.css';
import { User } from '../..';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostEditor from '../../Components/PostEditor';
import { useGetOnePostByIdLazyQuery, useUpdatePostMutation } from '../../graphql';

interface EditPostPageProps {
  loggedUser: User | undefined;
}

export default function EditPostPage(props: EditPostPageProps) {
  const [postTitle, setPostTitle] = useState<string>('');
  const [postContent, setPostContent] = useState<string>('');

  const [getOnePostById] = useGetOnePostByIdLazyQuery();
  const [updatePost] = useUpdatePostMutation();

  const { postId } = useParams();

  const navigate = useNavigate();

  const handleGetCurrentPost: () => Promise<void> = async (): Promise<void> => {
    if (!postId) return;
    const queryResult = await getOnePostById({ variables: { id: parseInt(postId) } });
    if (!queryResult.data?.getOnePostById) return;
    setPostTitle(queryResult.data.getOnePostById.title);
    setPostContent(queryResult.data.getOnePostById.content);
  };

  const handleUpdatePost: () => Promise<void> = async (): Promise<void> => {
    if (!postId) return;
    const queryResult = await updatePost({
      variables: {
        updatePostDto: {
          id: parseInt(postId),
          title: postTitle,
          content: postContent,
        },
      },
    });
    if (!queryResult.data?.updatePost) return;
    navigate(`/post/${postId}`);
  };

  useEffect(() => {
    (async () => {
      await handleGetCurrentPost();
    })();
  }, []);

  return !props.loggedUser ? (
    <Navigate to={''} />
  ) : (
    <main className="edit-post-page">
      <div>
        <h1>Modifier le post</h1>
        <Link to={`/post/${postId}`} className='button'>Annuler</Link>
      </div>
      <PostEditor
        type="update"
        postTitle={postTitle}
        setPostTitle={setPostTitle}
        postContent={postContent}
        setPostContent={setPostContent}
        handleSubmit={handleUpdatePost}
      />
    </main>
  );
}
