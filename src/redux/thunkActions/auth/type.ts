export interface IUserData {
  email: string | null;
  password: string | null;
  name?: string | null;
}

export interface ITokenData {
  token: string | undefined;
}
