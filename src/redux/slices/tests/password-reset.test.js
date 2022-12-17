import reducer from "../password-reset";
import {
  checkEmail,
  resetPassword,
} from "../../syncs/password-reset/password-reset";

const initialState = {
  requestPasswordReset: false,
  failedPasswordReset: false,
  successEmail: false,
  successPassword: false,
  messagePasswordReset: null,
};

describe("passwordResetSlice", () => {
  test("should change status with 'checkEmail.pending' action", () => {
    const state = reducer(initialState, checkEmail.pending());

    expect(state.requestPasswordReset).toBe(true);
  });

  test("should fetch user with 'checkEmail.fulfilled' action", () => {
    const data = { success: true, message: "string" };
    const state = reducer(initialState, checkEmail.fulfilled(data));

    expect(state.requestPasswordReset).toBe(false);
    expect(state.failedPasswordReset).toBe(false);
    expect(state.successEmail).toBe(data.success);
    expect(state.messagePasswordReset).toBe(data.message);
  });

  test("should change status and error with 'checkEmail.rejected' action", () => {
    const state = reducer(initialState, checkEmail.rejected());

    expect(state.requestPasswordReset).toBe(false);
    expect(state.failedPasswordReset).toBe(true);
  });

  test("should change status with 'resetPassword.pending' action", () => {
    const state = reducer(initialState, resetPassword.pending());

    expect(state.requestPasswordReset).toBe(true);
  });

  test("should fetch user with 'resetPassword.fulfilled' action", () => {
    const data = { success: true, message: "string" };
    const state = reducer(initialState, resetPassword.fulfilled(data));

    expect(state.requestPasswordReset).toBe(false);
    expect(state.failedPasswordReset).toBe(false);
    expect(state.successPassword).toBe(data.success);
    expect(state.messagePasswordReset).toBe(data.message);
  });

  test("should change status and error with 'resetPassword.rejected' action", () => {
    const state = reducer(initialState, resetPassword.rejected());

    expect(state.requestPasswordReset).toBe(false);
    expect(state.failedPasswordReset).toBe(true);
  });
});
