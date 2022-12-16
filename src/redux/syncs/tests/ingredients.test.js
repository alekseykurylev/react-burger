import { getIngredients } from "../ingredients/ingredients";

global.fetch = jest.fn();

describe("getIngredients", () => {
  test("should getIngredients with resolved response", async () => {
    const mockIngredients = { success: "string", data: [] };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockIngredients),
    });

    const dispatch = jest.fn();
    const thunk = getIngredients();

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(getIngredients.pending().type);
    expect(end[0].type).toBe(getIngredients.fulfilled().type);
    expect(end[0].payload).toBe(mockIngredients);
  });

  test("should getIngredients with rejected response", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();
    const thunk = getIngredients();

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(getIngredients.pending().type);
    expect(end[0].type).toBe(getIngredients.rejected().type);
    expect(end[0].meta.rejectedWithValue).toBe(true);
  });
});
