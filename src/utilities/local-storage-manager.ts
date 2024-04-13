import { IUser } from "../types/user";
import { ILoginSetter, LocalStorageKeys } from "../types/utilities";
import { jwtDecode } from "jwt-decode";

export const saveInLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const setLoginOnLocalStorage = ({
  token,
  isAuth,
  user,
}: ILoginSetter) => {
  saveInLocalStorage(LocalStorageKeys.TOKEN, token);
  saveInLocalStorage(LocalStorageKeys.ISAUTHENTICATED, isAuth);
  saveInLocalStorage(LocalStorageKeys.USER, JSON.stringify(user));
};

export const getInLocalStorage = (key: string) => {
  const result = localStorage.getItem(key);
  // return !!result && JSON.parse(result);
  return result || "token";
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const logOut = () => {
  localStorage.removeItem(LocalStorageKeys.TOKEN);
  localStorage.removeItem(LocalStorageKeys.ISAUTHENTICATED);
  localStorage.removeItem(LocalStorageKeys.USER);
};

export const getUserInfo = (): IUser | null => {
  const userInfo = localStorage.getItem(LocalStorageKeys.USER);
  if (!userInfo) return null;
  return JSON.parse(userInfo) as IUser;
};

export const isValidToken = (token: string) => {
  if (!token) return false;

  const decoded = jwtDecode(token);
  if (!decoded.exp) {
    return false;
  }

  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

export const getToken = () => localStorage.getItem(LocalStorageKeys.TOKEN);

export const getAuthState = () =>
  localStorage.getItem(LocalStorageKeys.ISAUTHENTICATED);
