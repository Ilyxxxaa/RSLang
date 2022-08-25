export interface IUser {
  name?: string;
  email: string;
  password: string;
}

export interface IUserAuthorized {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}
