import { request } from '../services/api';
import { IPost } from '../models/post';

export const postRequest = (postId: string) =>
  request<IPost>(`/posts/${postId}`);

export const createPostRequests = async (postFormData: FormData) =>
  request(`/posts`, {
    method: 'POST',
    body: postFormData,
    shouldStringifyBody: false
  });
