import { useEffect, useState } from 'react';
import PostComponent from '../../Components/Post';
import { Post, User } from '../..';
import { useParams } from 'react-router-dom';
import isUser from '../../utils/isUser';
import { useGetOnePostByIdLazyQuery } from '../../graphql';
import Error404 from '../../Components/Error';
import CreateComment from '../../Components/CreateComment';
import CommentsList from '../../Components/CommentsList';

interface PostPageProps {
  loggedUser: User | undefined;
}

export default function PostPage(props: PostPageProps) {
  const { postId } = useParams();

  const [postData, setPostData] = useState<Post>();
  const [postExist, setPostExist] = useState<boolean>(true);

  const [getOnePostById] = useGetOnePostByIdLazyQuery();

  const handleFetchPosts: () => Promise<void> = async (): Promise<void> => {
    if (!postId) return;
    const queryResult = await getOnePostById({
      variables: { id: parseInt(postId) },
    });
    if (!queryResult.data?.getOnePostById) {
      setPostExist(false);
      console.error('404');
      return;
    }
    const post: Post = queryResult.data.getOnePostById;
    setPostData(post);
  };

  useEffect((): void => {
    (async (): Promise<void> => {
      await handleFetchPosts();
    })();
  }, []);

  const myPost: boolean | undefined =
    props.loggedUser &&
    isUser(props.loggedUser) &&
    props.loggedUser.id === postData?.authorId;

  if (!postExist) {
    return <Error404 />;
  } else if (postData) {
    return (
      <main>
        <PostComponent postData={postData} myPost={myPost} />
        <CreateComment loggedUser={props.loggedUser} postId={postData.id} />
        <CommentsList postId={postData.id} />
      </main>
    );
  } else {
    return <main className="loading" />;
  }
}
