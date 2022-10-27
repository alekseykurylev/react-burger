import { createAsyncThunk } from "@reduxjs/toolkit";
import { makeRequest } from "../make-request";
import { baseUrl } from "../config";

export const getOrder = createAsyncThunk("order/getOrder", async (burger) =>
  makeRequest({
    url: `${baseUrl}orders`,
    method: "POST",
    data: burger,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
);
