import { createSlice } from "@reduxjs/toolkit";
import { IIngredient } from "../../api/rest/ingredients/type";
import { RootState } from "../store";

type BurgerState = {
  bun: IIngredient | null;
  filling: IIngredient[];
};

const initialState: BurgerState = {
  bun: null,
  filling: [],
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
  },
});

export const { addBun, addFilling, removeFilling, clearBurger, updateFilling } =
  burgerSlice.actions;
export default burgerSlice.reducer;
export const selectBurger = (state: RootState) => state.burger;
