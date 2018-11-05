import { createAction } from 'typesafe-actions';

import { ICurrentUser } from '../../models/users';

export const setCurrentUserAction = createAction('profile/setCurrentUser', resolve => {
  return (currentUser: ICurrentUser) => resolve(currentUser);
});

export const setCurrentUserInProgressAction = createAction('profile/setCurrentUserInProgress', resolve => {
  return (inProgress: boolean) => resolve(inProgress);
});

export const setCurrentUserErrorAction = createAction('profile/setCurrentUserError', resolve => {
  return (error: Error | null) => resolve(error);
});

export const setCurrentUserAvatarAction = createAction('profile/setCurrentUserAvatar', resolve => {
  return (avatarId: string) => resolve(avatarId);
});

export const setNewAvatarInProgressAction = createAction('profile/setNewAvatarInProgress', resolve => {
  return (inProgress: boolean) => resolve(inProgress);
});

export const setNewAvatarErrorAction = createAction('profile/setNewAvatarError', resolve => {
  return (error: Error | null) => resolve(error);
});
