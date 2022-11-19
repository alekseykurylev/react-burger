import { RootState } from "../store";

const selectIngredients = (store: RootState) => store.ingredients;

export default selectIngredients;
