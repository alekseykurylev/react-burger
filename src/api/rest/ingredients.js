import { createAsyncThunk } from "@reduxjs/toolkit";
import { makeRequest } from "../make-request";
import { baseUrl } from "../config";

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async () => makeRequest({ url: `${baseUrl}ingredients` })
);
