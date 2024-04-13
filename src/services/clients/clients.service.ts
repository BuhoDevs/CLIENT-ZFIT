import axiosApi from "../../config/axios";
import { IClient, IClientRequestBody } from "../../types/client";
import { clientsEndpointSave } from "./clients.endpoints";

export const saveClient = async ({
  firstname,
  lastname,
  birthdate,
  ci,
  phone,
  photo,
  genreId,
  weight,
  height,
  email,
  password,
}: IClientRequestBody): Promise<IClient> => {
  const { data } = await axiosApi.post(clientsEndpointSave(), {
    firstname,
    lastname,
    birthdate,
    ci,
    phone,
    photo,
    genreId,
    weight,
    height,
    email,
    password,
  });
  return data;
};
