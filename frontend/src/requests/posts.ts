import { request } from '../services/api';

export const postsRequests = () => request(`/posts`);

export const deleteRequest = (postId: string) => request(`/posts/${postId}`, { method: 'DELETE' });
