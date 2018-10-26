import { request } from '../services/api';

export const postRequest = (postId: string) => request(`posts/${postId}`);

export const createPostRequests = async (postFormData: FormData) => request(`/posts`, {
  method: 'POST',
  body: postFormData,
  shouldStringifyBody: false
});
