import { useEffect, useState } from 'react';
import PostComponent from '../../Components/Post';
import { Post, User } from '../..';
import { useParams } from 'react-router-dom';
import isUser from '../../utils/isUser';
import { useGetOnePostByIdLazyQuery } from '../../graphql';

interface PostPageProps {
  loggedUser: User | undefined;
}

export default function PostPage(props: PostPageProps) {
  const { postId } = useParams();

  const [postData, setPostData] = useState<Post>();
  const [getOnePostById] = useGetOnePostByIdLazyQuery();

  const handleFetchPosts: () => Promise<void> = async (): Promise<void> => {
    if (!postId) return;
    const queryResult = await getOnePostById({ variables: { id: parseInt(postId) } });
    if (queryResult.data?.getOnePostById) {
      const post: Post = queryResult.data.getOnePostById;
      setPostData(post);
    }
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

  return <main>{postData ? <PostComponent postData={postData} myPost={myPost} /> : null}</main>;
}
