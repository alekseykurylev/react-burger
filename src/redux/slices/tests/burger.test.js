import reducer, {
  addBun,
  addFilling,
  removeFilling,
  clearBurger,
  updateFilling,
} from "../burger";

const ingredient = {
  _id: "string",
  name: "string",
  type: "string",
  proteins: 123,
  fat: 123,
  carbohydrates: 123,
  calories: 123,
  price: 123,
  image: "string",
  image_mobile: "string",
  image_large: "string",
  __v: 123,
  dragId: "string",
};

const initialState = {
  bun: null,
  filling: [],
};

describe("burgerSlice", () => {
  test("should return the initial state", () => {
    const state = reducer(undefined, { type: undefined });

    expect(state).toEqual(initialState);
  });

  test('should add bun with "addBun" action', () => {
    const state = reducer(initialState, addBun(ingredient));

    expect(state.bun).toEqual(ingredient);
  });

  test('should add filling with "addFilling" action', () => {
    const state = reducer(initialState, addFilling(ingredient));

    expect(state.filling).toEqual([ingredient]);
  });

  test('should remove filling with "removeFilling" action', () => {
    const state = reducer(initialState, removeFilling("string"));

    expect(state.filling).toEqual([]);
  });

  test('should clear burger with "clearBurger" action', () => {
    const state = reducer(initialState, clearBurger());

    expect(state).toEqual(initialState);
  });

  test('should update filling with "updateFilling" action', () => {
    const state = reducer(initialState, updateFilling([ingredient]));

    expect(state.filling).toEqual([ingredient]);
  });
});
