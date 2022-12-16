import {
  getUser,
  updateUser,
  registerUser,
  loginUser,
  logoutUser,
} from "../auth/auth";

global.fetch = jest.fn();

describe("getUser", () => {
  test("should getUser with resolved response", async () => {
    const mockUser = [
      { success: true, user: { email: "string", name: "string" } },
    ];

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUser),
    });

    const dispatch = jest.fn();
    const thunk = getUser();

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(getUser.pending().type);
    expect(end[0].type).toBe(getUser.fulfilled().type);
    expect(end[0].payload).toBe(mockUser);
  });

  test("should getUser with rejected response", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();
    const thunk = getUser();

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(getUser.pending().type);
    expect(end[0].type).toBe(getUser.rejected().type);
    expect(end[0].meta.rejectedWithValue).toBe(true);
  });
});

describe("updateUser", () => {
  test("should getUser with resolved response", async () => {
    const mockUser = [
      { success: true, user: { email: "string", name: "string" } },
    ];

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUser),
    });

    const dispatch = jest.fn();
    const thunk = updateUser({
      email: "string",
      password: "string",
    });

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(updateUser.pending().type);
    expect(end[0].type).toBe(updateUser.fulfilled().type);
    expect(end[0].payload).toBe(mockUser);
  });

  test("should updateUser with rejected response", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();
    const thunk = updateUser();

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(updateUser.pending().type);
    expect(end[0].type).toBe(updateUser.rejected().type);
    expect(end[0].meta.rejectedWithValue).toBe(true);
  });
});

describe("registerUser", () => {
  test("should registerUser with resolved response", async () => {
    const mockUser = {
      success: true,
      accessToken: "string",
      refreshToken: "string",
      user: {},
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUser),
    });

    const dispatch = jest.fn();
    const thunk = registerUser({
      email: "string",
      password: "string",
    });

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(registerUser.pending().type);
    expect(end[0].type).toBe(registerUser.fulfilled().type);
    expect(end[0].payload).toBe(mockUser);
  });

  test("should registerUser with rejected response", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();
    const thunk = registerUser();

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(registerUser.pending().type);
    expect(end[0].type).toBe(registerUser.rejected().type);
    expect(end[0].meta.rejectedWithValue).toBe(true);
  });
});

describe("loginUser", () => {
  test("should loginUser with resolved response", async () => {
    const mockUser = {
      success: true,
      accessToken: "string",
      refreshToken: "string",
      user: {},
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUser),
    });

    const dispatch = jest.fn();
    const thunk = loginUser({
      email: "string",
      password: "string",
    });

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(loginUser.pending().type);
    expect(end[0].type).toBe(loginUser.fulfilled().type);
    expect(end[0].payload).toBe(mockUser);
  });

  test("should loginUser with rejected response", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();
    const thunk = loginUser();

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(loginUser.pending().type);
    expect(end[0].type).toBe(loginUser.rejected().type);
    expect(end[0].meta.rejectedWithValue).toBe(true);
  });
});

describe("logoutUser", () => {
  test("should logoutUser with resolved response", async () => {
    const mockUser = [{ success: true, message: "string" }];

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUser),
    });

    const dispatch = jest.fn();
    const thunk = logoutUser({
      token: "string",
    });

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(logoutUser.pending().type);
    expect(end[0].type).toBe(logoutUser.fulfilled().type);
    expect(end[0].payload).toBe(mockUser);
  });

  test("should logoutUser with rejected response", async () => {
    fetch.mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();
    const thunk = logoutUser();

    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(logoutUser.pending().type);
    expect(end[0].type).toBe(logoutUser.rejected().type);
    expect(end[0].meta.rejectedWithValue).toBe(true);
  });
});
