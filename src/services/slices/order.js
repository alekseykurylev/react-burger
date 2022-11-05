import { createSlice } from "@reduxjs/toolkit";
import { getOrder } from "../thunkActions/orders";

const initialState = {
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

export default orderSlice.reducer;
