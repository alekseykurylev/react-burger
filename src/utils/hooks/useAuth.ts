import { getAccessToken, getRefreshToken } from "../utils";

export const useAuth = () => {
  const isTokens = !!(getRefreshToken() && getAccessToken());

  return {
    isTokens,
  };
};
