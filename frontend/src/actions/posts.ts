import { IPost } from '../models/post';

export const postsRequest = () => ({
  type: 'POSTS_REQUEST'
});

export const postsRequestSuccess = (posts: IPost[]) => ({
  type: 'POSTS_REQUEST_SUCCESS',
  posts
});

export const postsRequestFailure = (error: any) => ({
  type: 'POSTS_REQUEST_FAILURE',
  error
});
