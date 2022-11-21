export interface IUser {
  email: string;
  name: string;
}

export interface ILoginAndRegisterResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IUserResponse {
  success: boolean;
  user: IUser;
}

export interface ILogoutResponse {
  success: boolean;
  message: string;
}

export interface ITokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}
