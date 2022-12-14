import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Order = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

type OrdersState = {
  status: "Connecting" | "Online" | "Offline";
  connectionError: string;
  success: boolean;
  orders: Order[];
  total: number | null;
  totalToday: number | null;
};

const initialState: OrdersState = {
  status: "Offline",
  connectionError: "",
  success: false,
  orders: [],
  total: null,
  totalToday: null,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    wsConnecting(state) {
      state.status = "Connecting";
    },
    wsOpen(state) {
      state.status = "Online";
    },
    wsClose(state) {
      state.status = "Offline";
    },
    wsError(state, action) {
      state.connectionError = action.payload;
    },
    wsMessage(state, action) {
      state.success = action.payload.success;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } =
  ordersSlice.actions;
export default ordersSlice.reducer;
export const selectOrders = (state: RootState) => state.orders;
