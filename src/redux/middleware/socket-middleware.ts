import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { Middleware } from "redux";

export type Insert = {
  type: string;
  data: {
    rows: number;
    pos: number;
  };
};
export type LiveTableAction = Insert;
export type LiveTableActions = Array<LiveTableAction>;

export type TwsActionTypes = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  wsConnecting: ActionCreatorWithoutPayload;
  wsOpen: ActionCreatorWithoutPayload;
  wsClose: ActionCreatorWithoutPayload;
  wsError: ActionCreatorWithPayload<string>;
  wsMessage: ActionCreatorWithPayload<LiveTableActions>;
};

export const createSocketMiddleware = (
  wsActions: TwsActionTypes
): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let url = "";
    let isConnected = false;
    let reconnectTimer = 0;

    return (next) => (action) => {
      const { dispatch } = store;
      const {
        connect,
        disconnect,
        wsClose,
        wsConnecting,
        wsError,
        wsMessage,
        wsOpen,
      } = wsActions;

      if (connect.match(action)) {
        console.log("Websocket connect");
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        window.clearTimeout(reconnectTimer);
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsOpen());
        };

        socket.onerror = () => {
          dispatch(wsError("Websocket error"));
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(wsMessage(parsedData));
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            console.log("error");
            dispatch(wsError(event.code.toString()));
          }

          if (isConnected) {
            dispatch(wsConnecting());
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect(url));
            }, 3000);
          }
        };

        if (disconnect.match(action)) {
          console.log("Websocket disconnect");
          window.clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          dispatch(wsClose());
          socket.close();
        }
      }

      next(action);
    };
  };
};
