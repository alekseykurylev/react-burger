import reducer from "../user";
import {
  getUser,
  updateUser,
  registerUser,
  loginUser,
  logoutUser,
} from "../../syncs/auth/auth";

const initialState = {
  isLoggedIn: false,
  email: null,
  name: null,
  isLoading: false,
  error: null,
};

describe("userSlice", () => {
  test("should change status with 'getUser.pending' action", () => {
    const state = reducer(initialState, getUser.pending());

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test("should fetch user with 'getUser.fulfilled' action", () => {
    const user = { success: true, user: { email: "string", name: "string" } };
    const state = reducer(initialState, getUser.fulfilled(user));

    expect(state.isLoggedIn).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.email).toBe("string");
    expect(state.name).toBe("string");
  });

  test("should change status and error with 'getUser.rejected' action", () => {
    const state = reducer(initialState, getUser.rejected());

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(undefined);
  });

  test("should change status with 'updateUser.pending' action", () => {
    const state = reducer(initialState, updateUser.pending());

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test("should fetch user with 'updateUser.fulfilled' action", () => {
    const user = { success: true, user: { email: "string", name: "string" } };
    const state = reducer(initialState, updateUser.fulfilled(user));

    expect(state.isLoggedIn).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.email).toBe("string");
    expect(state.name).toBe("string");
  });

  test("should change status and error with 'updateUser.rejected' action", () => {
    const state = reducer(initialState, getUser.rejected());

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(undefined);
  });

  test("should change status with 'registerUser.pending' action", () => {
    const state = reducer(initialState, registerUser.pending());

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test("should fetch user with 'registerUser.fulfilled' action", () => {
    const user = { success: true, user: { email: "string", name: "string" } };
    const state = reducer(initialState, registerUser.fulfilled(user));

    expect(state.isLoggedIn).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.email).toBe("string");
    expect(state.name).toBe("string");
  });

  test("should change status and error with 'registerUser.rejected' action", () => {
    const state = reducer(initialState, registerUser.rejected());

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(undefined);
  });

  test("should change status with 'loginUser.pending' action", () => {
    const state = reducer(initialState, loginUser.pending());

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test("should fetch user with 'loginUser.fulfilled' action", () => {
    const user = { success: true, user: { email: "string", name: "string" } };
    const state = reducer(initialState, loginUser.fulfilled(user));

    expect(state.isLoggedIn).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.email).toBe("string");
    expect(state.name).toBe("string");
  });

  test("should change status and error with 'loginUser.rejected' action", () => {
    const state = reducer(initialState, loginUser.rejected());

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe("Rejected");
  });

  test("should change status with 'logoutUser.pending' action", () => {
    const state = reducer(initialState, logoutUser.pending());

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test("should fetch user with 'logoutUser.fulfilled' action", () => {
    const user = { success: true, user: { email: "string", name: "string" } };
    const state = reducer(initialState, logoutUser.fulfilled(user));

    expect(state.isLoggedIn).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.email).toBe(null);
    expect(state.name).toBe(null);
    expect(state.error).toBe(null);
  });

  test("should change status and error with 'logoutUser.rejected' action", () => {
    const state = reducer(initialState, logoutUser.rejected());

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(undefined);
  });
});
