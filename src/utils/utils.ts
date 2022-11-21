import { tokenRequest } from "../api";

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

export const setCookie = (name: string, value: string, props?: any) => {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
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
