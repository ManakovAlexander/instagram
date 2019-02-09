import { request } from '../services/api';
import { IPostView } from '../models/post';

export const postsRequests = () => request<IPostView[]>(`/posts`);

export const deleteRequest = (postId: string) =>
  request(`/posts/${postId}`, { method: 'DELETE' });
