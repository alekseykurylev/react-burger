import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetPasswordRequest, checkEmailRequest } from "../../../api";
import { IEmailData, IResetData } from "./type";

export const checkEmail = createAsyncThunk(
  "password/checkEmail",
  async (data: IEmailData, { rejectWithValue }) => {
    try {
      return await checkEmailRequest(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "password/resetPassword",
  async (data: IResetData, { rejectWithValue }) => {
    try {
      return await resetPasswordRequest(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
