import { makeRequest } from "../../make-request";
import config from "../../config";
import { IOrdersResponse } from "./type";

export const ordersRequest = <T>(data: T) => {
  return makeRequest<IOrdersResponse>({
    url: `${config.baseUrl}/orders`,
    method: "POST",
    data: data,
  });
};
