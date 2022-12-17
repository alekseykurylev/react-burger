import { postOrder } from "../orders/orders";

global.fetch = jest.fn();

describe("postOrder", () => {
  test("should postOrder with resolved response", async () => {
    const mockOrder = { success: true, name: "string", order: {} };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockOrder),
    });

    const dispatch = jest.fn();
    const thunk = postOrder();

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(postOrder.pending().type);
    expect(end[0].type).toBe(postOrder.fulfilled().type);
    expect(end[0].payload).toBe(mockOrder);
  });

  test("should postOrder with rejected response", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();
    const thunk = postOrder();

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(postOrder.pending().type);
    expect(end[0].type).toBe(postOrder.rejected().type);
    expect(end[0].meta.rejectedWithValue).toBe(true);
  });
});
