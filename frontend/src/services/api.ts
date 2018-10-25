import { baseUrl } from '../constants';

export const request = async (url: string, params?: RequestInit) => {
  const resp = await fetch(`${baseUrl}${url}`, params);
  const isSuccess = resp.ok;
  if (isSuccess) {
    return await resp.json();
  } else {
    const errorMessage = await resp.text();
    throw new Error(errorMessage);
  }
};
