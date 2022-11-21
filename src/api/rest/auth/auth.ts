import { makeRequest } from "../../make-request";
import config from "../../config";
import {
  ILoginAndRegisterResponse,
  IUserResponse,
  ILogoutResponse,
  ITokenResponse,
} from "./type";

export const loginRequest = <T>(data: T) => {
  return makeRequest<ILoginAndRegisterResponse>({
    url: `${config.baseUrl}/auth/login`,
    method: "POST",
    data: data,
  });
};

export const registerRequest = <T>(data: T) => {
  return makeRequest<ILoginAndRegisterResponse>({
    url: `${config.baseUrl}/auth/register`,
    method: "POST",
    data: data,
  });
};

export const getUserRequest = () => {
  return makeRequest<IUserResponse>({
    url: `${config.baseUrl}/auth/user`,
    headers: {
      ...config.headers,
      authorization: true,
    },
  });
};

export const updateUserRequest = <T>(method: string, data: T) => {
  return makeRequest<IUserResponse>({
    url: `${config.baseUrl}/auth/user`,
    method: method,
    data: data,
    headers: {
      ...config.headers,
      authorization: true,
    },
  });
};

export const logoutRequest = <T>(data: T) => {
  return makeRequest<ILogoutResponse>({
    url: `${config.baseUrl}/auth/logout`,
    method: "POST",
    data: data,
  });
};

export const tokenRequest = (data: { token: string | undefined }) => {
  return makeRequest<ITokenResponse>({
    url: `${config.baseUrl}/auth/token`,
    method: "POST",
    data: data,
  });
};
