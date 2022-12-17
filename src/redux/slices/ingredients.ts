import { createSlice } from "@reduxjs/toolkit";
import { IIngredient } from "../../api/rest/ingredients/type";
import { RootState } from "../store";
import { getIngredients } from "../syncs/ingredients/ingredients";

type IngredientsState = {
  ingredients: IIngredient[];
  isLoadingIngredients: boolean;
  isErrorIngredients: boolean;
  categories: { [key: string]: string }[];
};

const initialState: IngredientsState = {
  ingredients: [],
  isLoadingIngredients: false,
  isErrorIngredients: false,
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
        state.isLoadingIngredients = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoadingIngredients = false;
        state.isErrorIngredients = false;
        state.ingredients = action.payload.data;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoadingIngredients = false;
        state.isErrorIngredients = true;
      });
  },
});

export default ingredientsSlice.reducer;
export const selectIngredients = (state: RootState) => state.ingredients;
