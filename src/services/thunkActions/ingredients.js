import { createAsyncThunk } from "@reduxjs/toolkit";
import { ingredientsRequest } from "../../api";

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async (_, { rejectWithValue }) => {
    try {
      return await ingredientsRequest();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
