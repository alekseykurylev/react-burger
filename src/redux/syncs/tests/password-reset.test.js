import { checkEmail, resetPassword } from "../password-reset/password-reset";

global.fetch = jest.fn();

describe("checkEmail", () => {
  test("should checkEmail with resolved response", async () => {
    const mockCheckEmail = { success: true, message: "string" };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCheckEmail),
    });

    const dispatch = jest.fn();
    const thunk = checkEmail({ email: "string" });

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(checkEmail.pending().type);
    expect(end[0].type).toBe(checkEmail.fulfilled().type);
    expect(end[0].payload).toBe(mockCheckEmail);
  });

  test("should checkEmail with rejected response", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();
    const thunk = checkEmail();

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(checkEmail.pending().type);
    expect(end[0].type).toBe(checkEmail.rejected().type);
    expect(end[0].meta.rejectedWithValue).toBe(true);
  });
});

describe("resetPassword", () => {
  test("should resetPassword with resolved response", async () => {
    const mockResetPassword = { success: true, message: "string" };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResetPassword),
    });

    const dispatch = jest.fn();
    const thunk = resetPassword({ password: "string", token: "string" });

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(resetPassword.pending().type);
    expect(end[0].type).toBe(resetPassword.fulfilled().type);
    expect(end[0].payload).toBe(mockResetPassword);
  });

  test("should resetPassword with rejected response", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();
    const thunk = resetPassword();

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(resetPassword.pending().type);
    expect(end[0].type).toBe(resetPassword.rejected().type);
    expect(end[0].meta.rejectedWithValue).toBe(true);
  });
});
