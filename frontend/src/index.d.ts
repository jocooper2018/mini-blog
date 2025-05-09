export interface User {
  id: number;
  email: string;
  username: string;
  createdAt: string;
}

export interface Post {
  id: number;
  authorId: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Comment {
  id: number;
  postId: number;
  authorId: number;
  title: string;
  content: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
