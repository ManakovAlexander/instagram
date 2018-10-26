import { ActionType } from 'typesafe-actions';

import * as actions from './sync';
import { postsRequests, deleteRequest } from '../../requests/posts';

import { Dispatch } from 'redux';

export type ActionTypes = ActionType<typeof actions>;

export const fetchPosts = () => async (dispatch: Dispatch<ActionTypes>) => {
  try {
    dispatch(actions.setPostsInProgressAction(true));
    const posts = await postsRequests();
    dispatch(actions.setPostsAction(posts));
    dispatch(actions.setPostsErrorAction(null));
  } catch (error) {
    dispatch(actions.setPostsErrorAction(error));
    setTimeout(() => actions.setPostsErrorAction(null), 3 * 1000);
  } finally {
    dispatch(actions.setPostsInProgressAction(false));
  }
};

export const deletePost = (postId: string) => async (dispatch: Dispatch<ActionTypes>) => {
  try {
    await deleteRequest(postId);
    dispatch(actions.deletePostAction(postId));
    dispatch(actions.setPostsErrorAction(null));
  } catch (error) {
    dispatch(actions.setPostsErrorAction(error));
    setTimeout(() => actions.setPostsErrorAction(null), 3 * 1000);
  }
};
