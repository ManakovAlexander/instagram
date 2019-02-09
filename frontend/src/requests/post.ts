import { request, authRequest } from '../services/api';
import { IPost } from '../models/post';

export const postRequest = (postId: string) =>
  request<IPost>(`/posts/${postId}`);

export const createPostRequests = async (postFormData: FormData) =>
  authRequest(`/posts`, {
    method: 'POST',
    body: postFormData,
    shouldStringifyBody: false
  });
