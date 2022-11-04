import { makeRequest } from "../make-request";
import config from "../config";

export const checkEmailRequest = (data) => {
  return makeRequest({
    url: `${config.baseUrl}/password-reset`,
    method: "POST",
    data: data,
  });
};

export const resetPasswordRequest = (data) => {
  return makeRequest({
    url: `${config.baseUrl}/password-reset/reset`,
    method: "POST",
    data: data,
  });
};
