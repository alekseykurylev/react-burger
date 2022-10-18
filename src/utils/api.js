import { createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "https://norma.nomoreparties.space/api/";

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}ingredients`);
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      const data = await response.json();
      return data.data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (burger, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(burger),
      });
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);
