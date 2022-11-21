import { makeRequest } from "../../make-request";
import config from "../../config";
import { IIngredients } from "./type";

export const ingredientsRequest = () => {
  return makeRequest<IIngredients>({
    url: `${config.baseUrl}/ingredients`,
  });
};
