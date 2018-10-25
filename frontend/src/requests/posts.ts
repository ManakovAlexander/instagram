import { request } from '../services/api';

export const getPosts = async () => request(`/posts`);

export const deleteRequest = async (postId: string) => request(`/posts/${postId}`, { method: 'DELETE' });
