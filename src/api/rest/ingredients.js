import { makeRequest } from "../make-request";
import config from "../config";

export const ingredientsRequest = () => {
  return makeRequest({
    url: `${config.baseUrl}/ingredients`,
  });
};
