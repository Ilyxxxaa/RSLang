import { logOut } from '../pages/main/authorization/authFunc';

interface IReqParams {
  method: string;
  headers: {
    Accept: string;
    'Content-Type': string;
    Authorization?: string;
  };
  withCredentials?: boolean;
  body?: {};
}

const request = async (
  method: string,
  url: string,
  body: {} | boolean = false,
  token: string = '',
) => {
  const reqParams: IReqParams = {
    method: `${method}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  if (body) {
    reqParams.body = JSON.stringify(body);
  }
  if (token) {
    reqParams.withCredentials = true;
    reqParams.headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${url}`, reqParams as {});
  if (response.status === 401) {
    logOut();
  }
  return response;
};

export default request;
