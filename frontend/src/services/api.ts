import { baseUrl } from '../constants';

interface ICustomRequestParams extends RequestInit {
  shouldStringifyBody?: boolean;
  body?: any;
}

export const request = async (url: string, requestParams: ICustomRequestParams = {}) => {
  const { shouldStringifyBody = true, body, ...params } = requestParams;
  let headers: HeadersInit = {
    'Accept': 'application/json',
  };
  if (shouldStringifyBody === true) {
    headers = {
      ...headers,
      'Content-Type': 'application/json; charset=utf-8',
    };
  }
  const resp = await fetch(`${baseUrl}${url}`, {
    ...params,
    body: shouldStringifyBody === false || body == null ? body : JSON.stringify(body),
    headers,
  });
  const isSuccess = resp.ok;
  if (isSuccess) {
    return await resp.json();
  } else {
    const errorMessage = await resp.text();
    throw new Error(errorMessage);
  }
};
