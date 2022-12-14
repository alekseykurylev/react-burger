import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  logoutRequest,
  getUserRequest,
  updateUserRequest,
  registerRequest,
  loginRequest,
} from "../../../api";
import { IUserData, ITokenData } from "./type";
import { refreshTokens } from "../../../utils/utils";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      return await getUserRequest();
    } catch (error: any) {
      if (error.message === "jwt expired") {
        await refreshTokens();
        return await getUserRequest();
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: IUserData, { rejectWithValue }) => {
    try {
      return await updateUserRequest("PATCH", data);
    } catch (error: any) {
      if (error.message === "jwt expired") {
        await refreshTokens();
        return await updateUserRequest("PATCH", data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (data: IUserData, { rejectWithValue }) => {
    try {
      return await registerRequest(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (data: IUserData, { rejectWithValue }) => {
    try {
      return await loginRequest(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (data: ITokenData, { rejectWithValue }) => {
    try {
      return await logoutRequest(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
