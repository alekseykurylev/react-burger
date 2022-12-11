import { createSlice } from "@reduxjs/toolkit";
import { IOrdersResponse } from "../../api/rest/orders/type";
import { RootState } from "../store";
import { postOrder } from "../syncs/orders/orders";

type OrderState = {
  newOrder: IOrdersResponse | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

const initialState: OrderState = {
  newOrder: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder(state) {
      state.newOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderFailed = false;
        state.newOrder = action.payload;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderFailed = true;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
export const selectOrder = (state: RootState) => state.order;
