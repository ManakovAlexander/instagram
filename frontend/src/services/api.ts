import { baseUrl } from '../constants';
import store from '../store';

interface ICustomRequestParams extends RequestInit {
  shouldStringifyBody?: boolean;
  body?: any;
  headers?: HeadersInit;
}

export async function authRequest<R>(
  url: string,
  requestParams: ICustomRequestParams = {}
): Promise<R> {
  const authToken = store.getState().auth.token;
  if (authToken) {
    requestParams = {
      ...requestParams,
      headers: {
        ...requestParams.headers,
        Authorization: `Bearer ${authToken}`
      }
    };
  }
  return request<R>(url, requestParams);
}

export async function request<R>(
  url: string,
  requestParams: ICustomRequestParams = {}
): Promise<R> {
  const { shouldStringifyBody = true, body, ...params } = requestParams;
  let headers: HeadersInit = {
    ...requestParams.headers,
    Accept: 'application/json'
  };
  if (shouldStringifyBody === true) {
    headers = {
      ...headers,
      'Content-Type': 'application/json; charset=utf-8'
    };
  }
  const resp = await fetch(`${baseUrl}${url}`, {
    ...params,
    body:
      shouldStringifyBody === false || body == null
        ? body
        : JSON.stringify(body),
    headers
  });
  const isSuccess = resp.ok;
  if (isSuccess) {
    return await resp.json();
  } else {
    const errorMessage = await resp.text();
    throw new Error(errorMessage);
  }
}
