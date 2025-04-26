import './index.css';
import { useState, useEffect } from 'react';
import PostList from '../../Components/PostList';
import { Post } from '../..';
import { useGetManyPostLazyQuery } from '../../graphql';

export default function Home() {

  const [postsList, setPosts] = useState<Post[]>([]);

  const [getManyPost] = useGetManyPostLazyQuery();

  const handleFetchPosts = async () => {
    const queryResult = await getManyPost();
    if (queryResult.data?.getManyPost) {
      const posts: Post[] = queryResult.data.getManyPost;
      setPosts(posts);
    }
  };

  useEffect(() => {
    (async () => {
      await handleFetchPosts();
    })();
  }, []);

  return (
    <main>
      <h1>Home</h1>
      <PostList postList={postsList} />
    </main>
  );
}
