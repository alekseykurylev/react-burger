import reducer, { clearOrder } from "../order";
import { postOrder } from "../../syncs/orders/orders";

const initialState = {
  newOrder: null,
  orderRequest: false,
  orderFailed: false,
};

describe("orderSlice", () => {
  test("should return the initial state", () => {
    const state = reducer(undefined, { type: undefined });

    expect(state).toEqual(initialState);
  });

  test('should clear order with "clearOrder" action', () => {
    const state = reducer(initialState, clearOrder());

    expect(state).toEqual(initialState);
  });

  test("should change status with 'postOrder.pending' action", () => {
    const state = reducer(initialState, postOrder.pending());

    expect(state.orderRequest).toBe(true);
  });

  test("should fetch user with 'postOrder.fulfilled' action", () => {
    const order = { success: true, name: "string", order: {} };
    const state = reducer(initialState, postOrder.fulfilled(order));

    expect(state.orderRequest).toBe(false);
    expect(state.orderFailed).toBe(false);
    expect(state.newOrder).toBe(order);
  });

  test("should change status and error with 'postOrder.rejected' action", () => {
    const state = reducer(initialState, postOrder.rejected());

    expect(state.orderRequest).toBe(false);
    expect(state.orderFailed).toBe(true);
  });
});
