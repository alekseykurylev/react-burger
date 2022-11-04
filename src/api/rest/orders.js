import { makeRequest } from "../make-request";
import config from "../config";

export const ordersRequest = (data) => {
  return makeRequest({
    url: `${config.baseUrl}/orders`,
    method: "POST",
    data: data,
  });
};
