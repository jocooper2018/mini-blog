import { Post } from '../..';
import PostComponent from '../../Components/Post';
import './index.css';

interface PostListProps {
  postList: Post[];
}

export default function PostList({ postList }: PostListProps) {
  return (
    <ul className="post-list">
      {postList.map((post) => (
        <li key={`post-${post.id}`}>
          <PostComponent postData={post} link={true} />
        </li>
      ))}
    </ul>
  );
}
