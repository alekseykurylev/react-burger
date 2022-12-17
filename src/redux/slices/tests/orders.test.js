import reducer, {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
} from "../orders";

const initialState = {
  status: "Offline",
  connectionError: "",
  success: false,
  orders: [],
  total: null,
  totalToday: null,
};

describe("ordersSlice", () => {
  test("should return the initial state", () => {
    const state = reducer(undefined, { type: undefined });

    expect(state).toEqual(initialState);
  });

  test('should change status with "wsConnecting" action', () => {
    const state = reducer(initialState, wsConnecting());

    expect(state.status).toEqual("Connecting");
  });

  test('should change status with "wsOpen" action', () => {
    const state = reducer(initialState, wsOpen());

    expect(state.status).toEqual("Online");
  });

  test('should change status with "wsClose" action', () => {
    const state = reducer(initialState, wsClose());

    expect(state.status).toEqual("Offline");
  });

  test('should add error with "wsError" action', () => {
    const state = reducer(initialState, wsError("String"));

    expect(state.connectionError).toEqual("String");
  });

  test('should change status with "wsMessage" action', () => {
    const state = reducer(
      initialState,
      wsMessage({ success: true, orders: [], total: 123, totalToday: 123 })
    );

    expect(state.success).toEqual(true);
    expect(state.orders).toEqual([]);
    expect(state.total).toEqual(123);
    expect(state.totalToday).toEqual(123);
  });
});
