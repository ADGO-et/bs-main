import { User } from "./authApi";
export interface Blog {
  _id?: string;
  title: string;
  content: string;
  blogImage: string;
  authorId: User;
  likes: string[];
  dislikes: string[];
  createdAt: string;
  updatedAt: string;
}
export interface BlogListResponse {
  status: string;
  message: string;
  data: {
    blogs: Blog[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface BlogResponse {
  status: string;
  message: string;
  data: Blog;
}
