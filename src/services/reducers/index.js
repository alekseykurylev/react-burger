import { configureStore, combineReducers } from "@reduxjs/toolkit";
import burgerReducer from "../slices/burger";
import ingredientsReducer from "../slices/ingredients";
import orderReducer from "../slices/order";
import passwordResetReducer from "../slices/password-reset";
import authReducer from "../slices/auth";
import modalReducer from "../slices/modal";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  order: orderReducer,
  modal: modalReducer,
  passwordReset: passwordResetReducer,
  auth: authReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
