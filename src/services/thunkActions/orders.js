import { createAsyncThunk } from "@reduxjs/toolkit";
import { ordersRequest } from "../../api";

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (data, { rejectWithValue }) => {
    try {
      return await ordersRequest(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
