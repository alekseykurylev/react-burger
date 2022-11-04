import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  filling: [],
  totalPrice: 0,
};

export const burgerSlice = createSlice({
  name: "burger",
  initialState,
  reducers: {
    addBun(state, action) {
      state.bun = action.payload;
    },
    addFilling(state, action) {
      state.filling = [...state.filling, { ...action.payload }];
    },
    removeFilling(state, action) {
      state.filling = state.filling.filter(
        (item) => item.dragId !== action.payload
      );
    },
    clearBurger(state) {
      state.bun = null;
      state.filling = [];
    },
    updateFilling(state, action) {
      state.filling = action.payload;
    },
    countTotalPrice(state) {
      state.totalPrice =
        state.filling.reduce((total, item) => {
          return total + item.price;
        }, 0) + (state.bun && state.bun.price * 2);
    },
  },
});

export default burgerSlice.reducer;
