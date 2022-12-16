import { createSlice } from "@reduxjs/toolkit";
import { removeTokens, saveTokens } from "../../utils/utils";
import { RootState } from "../store";
import {
  getUser,
  logoutUser,
  registerUser,
  loginUser,
  updateUser,
} from "../syncs/auth/auth";

type AuthState = {
  isLoggedIn: boolean;
  email: null | string;
  name: null | string;
  isLoading: boolean;
  error: any;
};

const initialState: AuthState = {
  isLoggedIn: false,
  email: null,
  name: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.isLoading = false;
        state.email = payload.user.email;
        state.name = payload.user.name;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        saveTokens(action.payload.refreshToken, action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.email = action.payload.user.email;
        state.name = action.payload.user.name;
        saveTokens(action.payload.refreshToken, action.payload.accessToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = null;
        state.email = null;
        state.name = null;
        removeTokens();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user;
