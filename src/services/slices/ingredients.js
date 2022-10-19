import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "../../utils/api";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientDetails: {},
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
  reducers: {
    addDetails(state, action) {
      state.ingredientDetails = action.payload;
    },
    removeDetails(state) {
      state.ingredientDetails = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.ingredientsRequest = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredientsFailed = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredientsFailed = true;
        console.log(action.error.message);
      });
  },
});

export default ingredientsSlice.reducer;
