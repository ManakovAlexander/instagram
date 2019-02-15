import { ActionType } from 'typesafe-actions';
import { Dispatch } from 'redux';

import * as actions from './sync';
import { currentUserRequests, updateAvatarRequest } from '../../requests/profile';

export type ActionTypes = ActionType<typeof actions>;

export const fetchCurrentUser = () => async (dispatch: Dispatch<ActionTypes>) => {
  try {
    dispatch(actions.setCurrentUserInProgressAction(true));
    const currentUser = await currentUserRequests();
    dispatch(actions.setCurrentUserAction(currentUser));
    dispatch(actions.setCurrentUserErrorAction(null));
  } catch (error) {
    dispatch(actions.setCurrentUserErrorAction(error));
    setTimeout(() => actions.setCurrentUserErrorAction(null), 3 * 1000);
  } finally {
    dispatch(actions.setCurrentUserInProgressAction(false));
  }
};

export const updateAvatar = (formData: FormData) => async (dispatch: Dispatch<ActionTypes>) => {
  try {
    dispatch(actions.setNewAvatarInProgressAction(true));
    const avatarId = await updateAvatarRequest(formData);
    dispatch(actions.setCurrentUserAvatarAction(avatarId));
    dispatch(actions.setNewAvatarErrorAction(null));
  } catch (error) {
    dispatch(actions.setNewAvatarErrorAction(error));
    setTimeout(() => actions.setNewAvatarErrorAction(null), 3 * 1000);
  } finally {
    dispatch(actions.setNewAvatarInProgressAction(false));
  }
};
