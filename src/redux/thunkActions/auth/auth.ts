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
  "auth/getUser",
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
  "auth/updateUser",
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

export const register = createAsyncThunk(
  "auth/register",
  async (data: IUserData, { rejectWithValue }) => {
    try {
      return await registerRequest(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: IUserData, { rejectWithValue }) => {
    try {
      return await loginRequest(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (data: ITokenData, { rejectWithValue }) => {
    try {
      return await logoutRequest(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
