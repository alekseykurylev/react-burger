import { tokenRequest } from "../api";
import { baseUrl } from "../const/const";

export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => getCookie("refreshToken");

export const setCookie = (
  name: string,
  value: string,
  props?: { [key: string]: string | boolean }
) => {
  props = props || {};

  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export const saveTokens = (refreshToken: string, accessToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  setCookie("refreshToken", refreshToken);
};

export const removeTokens = () => {
  window.localStorage.removeItem("accessToken");
  document.cookie = `refreshToken=;expires=${new Date(0)}`;
};

export const refreshTokens = async () => {
  const refreshToken = getCookie("refreshToken");
  const tokens = await tokenRequest({
    token: refreshToken,
  });
  saveTokens(tokens.refreshToken, tokens.accessToken);
};

export const refreshTokens2 = async () => {
  const refreshToken = getCookie("refreshToken");
  const body = { token: refreshToken };
  const response = await fetch(`${baseUrl}/auth/token`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const tokens = await response.json();
  saveTokens(tokens.refreshToken, tokens.accessToken);
};
