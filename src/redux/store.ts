import { configureStore, createAction } from "@reduxjs/toolkit";
import rootReducer from "./";
import { ingredientsApi } from "./api/ingredientsApi";
import { createSocketMiddleware } from "./middleware/socket-middleware";
import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
} from "./slices/orders";

export const connect = createAction<string, "LIVE_CONNECT">("LIVE_CONNECT");
export const disconnect = createAction("LIVE_DISCONNECT");

const wsActions = {
  connect,
  disconnect,
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
};

const websocketMiddleware = createSocketMiddleware(wsActions);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ingredientsApi.middleware,
      websocketMiddleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
