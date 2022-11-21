import { createSlice } from "@reduxjs/toolkit";
import { IOrdersResponse } from "../../api/rest/orders/type";
import { getOrder } from "../thunkActions/orders/orders";

interface IInitialState {
  order: IOrdersResponse | null;
  orderRequest: boolean;
  orderFailed: boolean;
}

const initialState: IInitialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder(state) {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderFailed = false;
        state.order = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderFailed = true;
        console.log(action.error.message);
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
