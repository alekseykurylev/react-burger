import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetPasswordRequest, checkEmailRequest } from "../../api";

export const checkEmail = createAsyncThunk(
  "password/checkEmail",
  async (data, { rejectWithValue }) => {
    try {
      return await checkEmailRequest(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "password/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      return await resetPasswordRequest(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
