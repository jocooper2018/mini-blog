import './index.css';
import { User } from '../..';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostEditor from '../../Components/PostEditor';
import {
  useGetOnePostByIdLazyQuery,
  useUpdatePostMutation,
} from '../../graphql';
import Error404 from '../../Components/Error';

interface EditPostPageProps {
  loggedUser: User | undefined;
}

export default function EditPostPage(props: EditPostPageProps) {
  const [postTitle, setPostTitle] = useState<string>('');
  const [postContent, setPostContent] = useState<string>('');
  const [postExist, setPostExist] = useState<boolean>(true);

  const [getOnePostById] = useGetOnePostByIdLazyQuery();
  const [updatePost] = useUpdatePostMutation();

  const { postId } = useParams();

  const navigate = useNavigate();

  const handleGetCurrentPost: () => Promise<void> = async (): Promise<void> => {
    if (!postId) return;
    const queryResult = await getOnePostById({
      variables: { id: parseInt(postId) },
    });
    if (!queryResult.data?.getOnePostById) {
      setPostExist(false);
      console.error('404');
      return;
    }
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

  if (!postExist) {
    return <Error404 />;
  } else if (!props.loggedUser) {
    return <Navigate to={`/post/${postId}`} />;
  } else {
    return (
      <main className="edit-post-page">
        <div>
          <h1>Modifier le post</h1>
          <Link to={`/post/${postId}`} className="button">
            Annuler
          </Link>
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
}
