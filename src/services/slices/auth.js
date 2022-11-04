import { createSlice } from "@reduxjs/toolkit";
import { removeTokens, saveTokens } from "../../utils/utils";
import {
  getUser,
  logout,
  register,
  login,
  updateUser,
} from "../thunkActions/auth";

const initialState = {
  isLoggedIn: false,
  emailAuth: null,
  nameAuth: null,

  loadingAuth: false,
  errorAuth: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loadingAuth = true;
        state.errorAuth = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loadingAuth = false;
        state.isLoggedIn = true;
        state.emailAuth = action.payload.user.email;
        state.nameAuth = action.payload.user.name;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loadingAuth = false;
        state.errorAuth = action.payload;
        console.error(action.payload, action.error);
      })

      .addCase(updateUser.pending, (state) => {
        state.loadingAuth = true;
        state.errorAuth = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action);
        state.loadingAuth = false;
        state.isLoggedIn = true;
        state.emailAuth = action.payload.user.email;
        state.nameAuth = action.payload.user.name;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log(action);
        state.loadingAuth = false;
        state.errorAuth = action.payload;
        console.error(action.payload, action.error);
      })

      .addCase(login.pending, (state) => {
        state.loadingAuth = true;
        state.errorAuth = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loadingAuth = false;
        state.isLoggedIn = true;
        state.emailAuth = action.payload.user.email;
        state.nameAuth = action.payload.user.name;
        saveTokens(action.payload.refreshToken, action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.loadingAuth = false;
        state.errorAuth = action.payload;
        console.error(action.payload, action.error);
      })

      .addCase(register.pending, (state) => {
        state.loadingAuth = true;
        state.errorAuth = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loadingAuth = false;
        state.isLoggedIn = true;
        state.emailAuth = action.payload.user.email;
        state.nameAuth = action.payload.user.name;
        saveTokens(action.payload.refreshToken, action.payload.accessToken);
      })
      .addCase(register.rejected, (state, action) => {
        state.loadingAuth = false;
        state.errorAuth = action.payload;
        console.error(action.payload, action.error);
      })

      .addCase(logout.pending, (state) => {
        state.loadingAuth = true;
        state.errorAuth = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loadingAuth = false;
        state.isLoggedIn = false;
        state.errorAuth = null;
        state.emailAuth = null;
        state.nameAuth = null;
        removeTokens();
      })
      .addCase(logout.rejected, (state, action) => {
        state.loadingAuth = false;
        state.errorAuth = action.payload;
        console.error(action.payload, action.error);
      });
  },
});

export const { removeToken } = authSlice.actions;
export default authSlice.reducer;
