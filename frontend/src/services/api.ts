import { baseUrl } from '../constants';

interface ICustomRequestParams extends RequestInit {
  shouldStringifyBody?: boolean;
  body?: any;
}

export const request = async (url: string, requestParams: ICustomRequestParams = {}) => {
  const { shouldStringifyBody, body, ...params } = requestParams;
  const resp = await fetch(`${baseUrl}${url}`, {
    ...params,
    body: shouldStringifyBody === false || body == null ? body : JSON.stringify(body),
  });
  const isSuccess = resp.ok;
  if (isSuccess) {
    return await resp.json();
  } else {
    const errorMessage = await resp.text();
    throw new Error(errorMessage);
  }
};
