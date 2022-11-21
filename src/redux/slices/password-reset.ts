import { createSlice } from "@reduxjs/toolkit";
import {
  checkEmail,
  resetPassword,
} from "../thunkActions/password-reset/password-reset";

interface IInitialState {
  requestPasswordReset: boolean;
  failedPasswordReset: boolean;
  successEmail: boolean;
  successPassword: boolean;
  messagePasswordReset: string | null;
}

const initialState: IInitialState = {
  requestPasswordReset: false,
  failedPasswordReset: false,
  successEmail: false,
  successPassword: false,
  messagePasswordReset: null,
};

export const passwordResetSlice = createSlice({
  name: "password",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkEmail.pending, (state) => {
        state.requestPasswordReset = true;
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.requestPasswordReset = false;
        state.failedPasswordReset = false;
        state.successEmail = action.payload.success;
        state.messagePasswordReset = action.payload.message;
      })
      .addCase(checkEmail.rejected, (state, action) => {
        state.requestPasswordReset = false;
        state.failedPasswordReset = true;
        console.log(action.error.message);
      })

      .addCase(resetPassword.pending, (state) => {
        state.requestPasswordReset = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.requestPasswordReset = false;
        state.failedPasswordReset = false;
        state.successPassword = action.payload.success;
        state.messagePasswordReset = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.requestPasswordReset = false;
        state.failedPasswordReset = true;
        console.log(action.error.message);
      });
  },
});

export default passwordResetSlice.reducer;
