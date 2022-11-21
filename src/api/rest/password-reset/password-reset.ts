import { makeRequest } from "../../make-request";
import config from "../../config";
import { IPasswordResetResponse } from "./type";

export const checkEmailRequest = <T>(data: T) => {
  return makeRequest<IPasswordResetResponse>({
    url: `${config.baseUrl}/password-reset`,
    method: "POST",
    data: data,
  });
};

export const resetPasswordRequest = <T>(data: T) => {
  return makeRequest<IPasswordResetResponse>({
    url: `${config.baseUrl}/password-reset/reset`,
    method: "POST",
    data: data,
  });
};
