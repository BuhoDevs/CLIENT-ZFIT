import axiosApi from "../../config/axios";
import {
  IClient,
  IClientRequestBody,
  IGetClientPromise,
} from "../../types/client";
import {
  clientsEndpointGetAll,
  clientsEndpointSave,
} from "./clients.endpoints";

export const getAllClients = async (): Promise<IClient[]> => {
  const { data } = await axiosApi.get<IGetClientPromise>(
    clientsEndpointGetAll()
  );
  return data.client;
};

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
