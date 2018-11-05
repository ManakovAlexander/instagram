import { request } from '../services/api';
import { IPost } from '../models/post';

export const postsRequests = () => request<IPost[]>(`/posts`);

export const deleteRequest = (postId: string) =>
  request(`/posts/${postId}`, { method: 'DELETE' });
