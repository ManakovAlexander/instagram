import { ActionType } from 'typesafe-actions';

import * as actions from './sync';
import { registerRequests } from '../../requests/register';

import { Dispatch } from 'redux';
import { IRegisterData } from '../../models/register';

export type ActionTypes = ActionType<typeof actions>;

export const register = (registerData: IRegisterData) => async (dispatch: Dispatch<ActionTypes>) => {
  try {
    await registerRequests(registerData);
    dispatch(actions.registerSetInProgress(true));
    dispatch(actions.registerFailure(null));
  } catch (error) {
    dispatch(actions.registerFailure(error));
  } finally {
    dispatch(actions.registerSetInProgress(false));
  }
};
