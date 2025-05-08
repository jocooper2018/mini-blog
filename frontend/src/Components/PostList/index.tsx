import './index.css';
import { Post } from '../..';
import PostComponent from '../../Components/Post';

interface PostListProps {
  postList: Post[];
}

export default function PostList(props: PostListProps) {
  if (props.postList.length === 0) {
    return (
      <div className="post-list empty">
        <span>Aucuns posts</span>
      </div>
    );
  }
  return (
    <ul className="post-list">
      {props.postList.map((post) => (
        <li key={`post-${post.id}`}>
          <PostComponent postData={post} link={true} />
        </li>
      ))}
    </ul>
  );
}
