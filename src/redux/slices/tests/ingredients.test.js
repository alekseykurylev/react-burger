import reducer from "../ingredients";
import { getIngredients } from "../../syncs/ingredients/ingredients";

const initialState = {
  ingredients: [],
  isLoadingIngredients: false,
  isErrorIngredients: false,
};

describe("userSlice", () => {
  test("should change status with 'getIngredients.pending' action", () => {
    const state = reducer(initialState, getIngredients.pending());

    expect(state.isLoadingIngredients).toBe(true);
  });

  test("should fetch user with 'getIngredients.fulfilled' action", () => {
    const data = [];
    const state = reducer(initialState, getIngredients.fulfilled(data));

    expect(state.isLoadingIngredients).toBe(false);
    expect(state.isErrorIngredients).toBe(false);
    expect(state.ingredients).toBe(undefined);
  });

  test("should change status and error with 'getIngredients.rejected' action", () => {
    const state = reducer(initialState, getIngredients.rejected());

    expect(state.isLoadingIngredients).toBe(false);
    expect(state.isErrorIngredients).toBe(true);
    expect(state.error).toBe(undefined);
  });
});
