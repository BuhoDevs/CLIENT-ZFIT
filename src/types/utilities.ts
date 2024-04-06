import { IUser } from "./user";

export enum LocalStorageKeys {
  REFRESH_TOKEN = "refreshToken",
  TOKEN = "token",
  USER = "user",
  ISAUTHENTICATED = "isAuthenticated",
}

export interface ILoginSetter {
  token: string;
  isAuth: string;
  user: IUser;
}
