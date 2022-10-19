import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponse } from "./utils";
const baseUrl = "https://norma.nomoreparties.space/api/";

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async () =>
    fetch(`${baseUrl}ingredients`)
      .then(checkResponse)
      .then((data) => data.data)
);

export const getOrder = createAsyncThunk("order/getOrder", async (burger) =>
  fetch(`${baseUrl}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(burger),
  })
    .then(checkResponse)
    .then((data) => data)
);
