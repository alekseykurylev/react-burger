import { createAsyncThunk } from "@reduxjs/toolkit";
import { ordersRequest } from "../../../api";
import { refreshTokens } from "../../../utils/utils";
import { TPostOrder } from "./type";

export const postOrder = createAsyncThunk(
  "order/postOrder",
  async (data: TPostOrder, { rejectWithValue }) => {
    try {
      return await ordersRequest(data);
    } catch (error: any) {
      if (error.message === "jwt expired") {
        await refreshTokens();
        return await ordersRequest(data);
      }
      return rejectWithValue(error.message);
    }
  }
);
