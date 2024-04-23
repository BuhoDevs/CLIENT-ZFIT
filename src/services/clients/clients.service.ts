import axiosApi from "../../config/axios";
import {
  IClient,
  IClientDataTable,
  IClientFilters,
  IGetClientPromise,
} from "../../types/client";
import {
  clientsEndpointGetAll,
  clientsEndpointSave,
} from "./clients.endpoints";
import { clientFiltersParsed } from "./utils";

export const getClients = async ({
  clientData,
  skip,
  take,
}: IClientFilters): Promise<IClientDataTable[]> => {
  const { data } = await axiosApi.post<IGetClientPromise>(
    clientsEndpointGetAll(),
    clientFiltersParsed({ clientData, skip, take })
  );
  return data.clients;
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
