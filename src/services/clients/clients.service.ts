import axiosApi from "../../config/axios";
import { IClient, IGetClientPromise } from "../../types/client";
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
  bodyData,
}: {
  bodyData: FormData;
}): Promise<IClient> => {
  const { data } = await axiosApi.post(clientsEndpointSave(), bodyData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
