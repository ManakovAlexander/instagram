import { request } from '../services/api';

import { IRegisterData } from '../models/register';

export const registerRequests = (registerData: IRegisterData) =>
  request(`/users`, { method: 'PUT', body: registerData });
