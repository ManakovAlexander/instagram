import { authRequest } from '../services/api';
import { ICurrentUser } from '../models/users';

export const currentUserRequests = () => authRequest<ICurrentUser>(`/profile`);

export const updateAvatarRequest = (fromData: FormData) =>
  authRequest<string>(`/profile/avatar`, {
    method: 'POST',
    body: fromData,
    shouldStringifyBody: false
  });
