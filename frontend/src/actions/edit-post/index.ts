import { ActionType } from 'typesafe-actions';

import * as actions from './sync';
import { postRequest, createPostRequests } from '../../requests/post';

import { Dispatch } from 'redux';

export type ActionTypes = ActionType<typeof actions>;

export const fetchPost = (postId: string) => async (dispatch: Dispatch<ActionTypes>) => {
  try {
    dispatch(actions.setFetchInProgressAction(true));
    const post = await postRequest(postId);
    dispatch(actions.setPostAction(post));
    dispatch(actions.setFetchErrorAction(null));
  } catch (error) {
    dispatch(actions.setFetchErrorAction(error));
    setTimeout(() => actions.setFetchErrorAction(null), 3 * 1000);
  } finally {
    dispatch(actions.setFetchInProgressAction(false));
  }
};

export const createPost = (postFormData: FormData) => async (dispatch: Dispatch<ActionTypes>) => {
  try {
    dispatch(actions.setSaveInProgressAction(true));
    await createPostRequests(postFormData);
    dispatch(actions.setSaveErrorAction(null));
  } catch (error) {
    dispatch(actions.setSaveErrorAction(error));
    setTimeout(() => actions.setSaveErrorAction(null), 3 * 1000);
  } finally {
    dispatch(actions.setSaveInProgressAction(false));
  }
};
