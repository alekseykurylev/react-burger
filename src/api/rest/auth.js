import { makeRequest } from "../make-request";
import config from "../config";

export const loginRequest = (data) => {
  return makeRequest({
    url: `${config.baseUrl}/auth/login`,
    method: "POST",
    data: data,
  });
};

export const registerRequest = (data) => {
  return makeRequest({
    url: `${config.baseUrl}/auth/register`,
    method: "POST",
    data: data,
  });
};

export const logoutRequest = (data) => {
  return makeRequest({
    url: `${config.baseUrl}/auth/logout`,
    method: "POST",
    data: data,
  });
};

export const userRequest = (method, data) => {
  return makeRequest({
    url: `${config.baseUrl}/auth/user`,
    method: method,
    data: data,
    headers: {
      ...config.headers,
      authorization: true,
    },
  });
};

export const tokenRequest = (data) => {
  return makeRequest({
    url: `${config.baseUrl}/auth/token`,
    method: "POST",
    data: data,
  });
};

export const userUpdateRequest = () => {
  return makeRequest({
    url: `${config.baseUrl}/auth/user`,
    method: "PATCH",
  });
};
