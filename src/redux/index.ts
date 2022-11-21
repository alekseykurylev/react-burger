import { combineReducers } from "redux";
import burgerSlice from "./slices/burger";
import ingredientsSlice from "./slices/ingredients";
import orderSlice from "./slices/order";
import passwordResetSlice from "./slices/password-reset";
import authSlice from "./slices/auth";

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  burger: burgerSlice,
  order: orderSlice,
  passwordReset: passwordResetSlice,
  auth: authSlice,
});

export default rootReducer;
