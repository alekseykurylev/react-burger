import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../const/const";

interface Ingredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  dragId: string;
}

interface GetIngredientsResponse {
  success: string;
  data: Ingredient[];
}

export const ingredientsApi = createApi({
  reducerPath: "ingredientsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (build) => ({
    getIngredients: build.query<GetIngredientsResponse, string>({
      query: () => ({
        url: `ingredients`,
      }),
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
