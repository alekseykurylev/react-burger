import { makeRequest } from "../../make-request";
import config from "../../config";
import { IOrdersResponse, IOrdersNumberResponse } from "./type";

export const ordersRequest = <T>(data: T) => {
  return makeRequest<IOrdersResponse>({
    url: `${config.baseUrl}/orders`,
    method: "POST",
    data: data,
    authorization: true,
  });
};

export const ordersNumberRequest = <T>(number: T) => {
  return makeRequest<IOrdersNumberResponse>({
    url: `${config.baseUrl}/orders/${number}`,
  });
};
