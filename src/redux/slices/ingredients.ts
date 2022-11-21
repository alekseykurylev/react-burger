import { createSlice } from "@reduxjs/toolkit";
import { IIngredient } from "../../api/rest/ingredients/type";
import { getIngredients } from "../thunkActions/ingredients/ingredients";

interface IInitialState {
  ingredients: IIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  categories: { [key: string]: string }[];
}

const initialState: IInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  categories: [
    {
      type: "bun",
      name: "Булки",
    },
    {
      type: "sauce",
      name: "Соусы",
    },
    {
      type: "main",
      name: "Начинки",
    },
  ],
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.ingredientsRequest = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredientsFailed = false;
        state.ingredients = action.payload.data;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredientsFailed = true;
        console.log(action.error.message);
      });
  },
});

export default ingredientsSlice.reducer;
