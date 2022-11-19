import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  logoutRequest,
  userRequest,
  registerRequest,
  loginRequest,
} from "../../api";
import { refreshTokens } from "../../utils/utils";

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      return await userRequest();
    } catch (error) {
      if (error.message === "jwt expired") {
        await refreshTokens();
        return await userRequest();
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (data, { rejectWithValue }) => {
    try {
      return await userRequest("PATCH", data);
    } catch (error) {
      if (error.message === "jwt expired") {
        await refreshTokens();
        return await userRequest("PATCH", data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      return await registerRequest(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      return await loginRequest(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (data, { rejectWithValue }) => {
    try {
      return await logoutRequest(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
