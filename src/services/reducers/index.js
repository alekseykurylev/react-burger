import { configureStore, combineReducers } from "@reduxjs/toolkit";
import burgerReducer from "../slices/burger";
import ingredientsReducer from "../slices/ingredients";
import orderReducer from "../slices/order";
import passwordResetReducer from "../slices/password-reset";
import authReducer from "../slices/auth";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  order: orderReducer,
  passwordReset: passwordResetReducer,
  auth: authReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
