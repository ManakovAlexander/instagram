import { ActionTypes } from '../actions/profile';
import { Reducer } from 'redux';

import { ICurrentUser } from '../models/users';

export class State {
  readonly currentUser: ICurrentUser | null = null;
  readonly currentUserInProgress: boolean = false;
  readonly currentUserError: Error | null = null;
  readonly newAvatarInProgress: boolean = false;
  readonly newAvatarError: Error | null = null;
}

export const reducer: Reducer<State, ActionTypes> = (
  state = { ...new State() },
  action: ActionTypes
) => {
  if (action.type === 'profile/setCurrentUser') {
    return { ...state, currentUser: action.payload };
  }

  if (action.type === 'profile/setCurrentUserAvatar') {
    if (!state.currentUser) {
      return state;
    }
    const currentUser: ICurrentUser = {
      ...state.currentUser,
      avatarId: action.payload
    };
    return { ...state, currentUser };
  }

  if (action.type === 'profile/setCurrentUserInProgress') {
    return { ...state, currentUserInProgress: action.payload };
  }

  if (action.type === 'profile/setCurrentUserError') {
    return { ...state, error: action.payload };
  }

  if (action.type === 'profile/setNewAvatarInProgress') {
    return { ...state, newAvatarInProgress: action.payload };
  }

  if (action.type === 'profile/setNewAvatarError') {
    return { ...state, newAvatarError: action.payload };
  }

  return state;
};
