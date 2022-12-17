import { selectBurger } from "../burger";
import { selectIngredients } from "../ingredients";

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

describe("redux selectors", () => {
  test("should select burger from state object", () => {
    const burger = { bun: { ...ingredient }, filling: [ingredient] };

    const result = selectBurger({ burger: burger });

    expect(result).toEqual(burger);
  });

  test("should select ingredients from state object", () => {
    const ingredients = {
      ingredients: [ingredient],
      isLoadingIngredients: false,
      isErrorIngredients: false,
    };

    const result = selectIngredients({ ingredients: ingredients });

    expect(result).toEqual(ingredients);
  });
});
