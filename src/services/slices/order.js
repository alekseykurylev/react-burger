import { createSlice } from "@reduxjs/toolkit";
import { getOrder } from "../../utils/api";

const initialState = {
  ingredientsId: {},
  order: {},
  orderRequest: false,
  orderFailed: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder(state) {
      state.ingredientsId = {};
      state.order = {};
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
