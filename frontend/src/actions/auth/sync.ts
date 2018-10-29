import { createAction } from 'typesafe-actions';

export const setInProgressAction = createAction('auth/set-in-progress', resolve => {
  return (inProgress: boolean) => resolve(inProgress);
});

export const setErrorAction = createAction('auth/set-error', resolve => {
  return (error: Error | null) => resolve(error);
});

export const setTokenAction = createAction('auth/set-token', resolve => {
  return (token: string | null) => resolve(token);
});
