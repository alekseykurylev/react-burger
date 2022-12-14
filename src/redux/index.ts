import { combineReducers } from "redux";
import burgerSlice from "./slices/burger";
import ingredientsSlice from "./slices/ingredients";
import orderSlice from "./slices/order";
import passwordResetSlice from "./slices/password-reset";
import userSlice from "./slices/user";
import ordersSlice from "./slices/orders";
import { ingredientsApi } from "./api/ingredientsApi";

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  burger: burgerSlice,
  order: orderSlice,
  passwordReset: passwordResetSlice,
  user: userSlice,
  orders: ordersSlice,
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,
});

export default rootReducer;
