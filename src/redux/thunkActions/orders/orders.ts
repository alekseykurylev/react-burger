import { createAsyncThunk } from "@reduxjs/toolkit";
import { ordersRequest } from "../../../api";
import { IOrdersData } from "./type";

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (data: IOrdersData, { rejectWithValue }) => {
    try {
      return await ordersRequest(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
