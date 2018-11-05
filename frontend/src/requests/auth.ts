import { request } from '../services/api';

import { IAuthData } from '../models/auth';

export const authRequest = (authData: IAuthData) =>
  request<{ token: string }>(`/auth`, { method: 'PUT', body: authData });
