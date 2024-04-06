import axiosApi from "../../config/axios";
import { IAuthPromise, IAuthRequestBody } from "../../types/auth";
import { loginEndpoint } from "./auth.endpoints";

export const loginService = async ({
  email,
  password,
}: IAuthRequestBody): Promise<IAuthPromise> => {
  const { data } = await axiosApi.post(loginEndpoint(), { email, password });

  return data;
};
