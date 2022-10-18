import { configureStore, combineReducers } from "@reduxjs/toolkit";
import burgerReducer from "../slices/burger";
import ingredientsReducer from "../slices/ingredients";
import orderReducer from "../slices/order";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  order: orderReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
