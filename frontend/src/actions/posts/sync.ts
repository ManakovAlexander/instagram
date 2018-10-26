import { createAction } from 'typesafe-actions';

import { IPost } from '../../models/post';

export const setPostsAction = createAction('posts/set', resolve => {
  return (posts: IPost[]) => resolve(posts);
});

export const setPostsInProgressAction = createAction('posts/setInProgress', resolve => {
  return (inProgress: boolean) => resolve(inProgress);
});

export const setPostsErrorAction = createAction('posts/setError', resolve => {
  return (error: Error | null) => resolve(error);
});

export const deletePostAction = createAction('posts/delete', resolve => {
  return (postId: string) => resolve(postId);
});
