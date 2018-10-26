import { createAction } from 'typesafe-actions';

export const registerSetInProgress = createAction('register/setInProgress', resolve => {
  return (inProgress: boolean) => resolve(inProgress);
});

export const registerFailure = createAction('register/setError', resolve => {
  return (error: Error | null) => resolve(error);
});
