import { createAction } from 'typesafe-actions';

import { IPost } from '../../models/post';

export const setPostAction = createAction('edit-post/set-post', resolve => {
  return (post: IPost) => resolve(post);
});

export const setFetchInProgressAction = createAction('edit-post/set-fetch-in-progress', resolve => {
  return (fetchInProgress: boolean) => resolve(fetchInProgress);
});

export const setFetchErrorAction = createAction('edit-post/set-fetch-error', resolve => {
  return (error: Error | null) => resolve(error);
});

export const setSaveInProgressAction = createAction('edit-post/set-save-in-progress', resolve => {
  return (saveInProgress: boolean) => resolve(saveInProgress);
});

export const setSaveErrorAction = createAction('edit-post/set-save-error', resolve => {
  return (error: Error | null) => resolve(error);
});
