import { ActionType } from 'typesafe-actions';
import * as actions from './sync';
import { Dispatch } from 'redux';

import { authRequest } from '../../requests/auth';
import { IAuthData } from '../../models/auth';

export type ActionTypes = ActionType<typeof actions>;

export const auth = (authData: IAuthData) => async (dispatch: Dispatch<ActionTypes>) => {
  try {
    dispatch(actions.setInProgressAction(true));
    const { token } = await authRequest(authData);
    dispatch(actions.setTokenAction(token));
    dispatch(actions.setErrorAction(null));
  } catch (error) {
    dispatch(actions.setErrorAction(error));
    setTimeout(() => dispatch(actions.setErrorAction(null)), 3 * 1000);
  } finally {
    dispatch(actions.setInProgressAction(false));
  }
};
