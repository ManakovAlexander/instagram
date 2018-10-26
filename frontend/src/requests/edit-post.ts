import { request } from '../services/api';

export const createPostRequests = async (postFormData: FormData) => request(`/posts`, {
  method: 'POST',
  body: postFormData,
  shouldStringifyBody: false
});
