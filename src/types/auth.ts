import { IUser } from "./user";

export interface IAuthPromise {
  token: string;
  user: IUser;
  message?: string;
}

export interface IAuthRequestBody {
  email: string;
  password: string;
}
