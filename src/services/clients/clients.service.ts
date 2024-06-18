import axiosApi from "../../config/axios";
import {
  IClient,
  IClientByIdEdition,
  IClientDataTable,
  IClientEditionResponse,
  IClientFilters,
  IGetClientPromise,
} from "../../types/client";
import {
  clientsEndpointGetAll,
  clientsEndpointGetById,
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

export const getClientById = async ({
  clientId,
}: {
  clientId: number;
}): Promise<IClientByIdEdition> => {
  const { data } = await axiosApi.get<IClientByIdEdition>(
    clientsEndpointGetById({ clientId })
  );

  return data;
};

export const getClientByIdEdition = async ({
  clientId,
}: {
  clientId: number;
}): Promise<IClientByIdEdition> => {
  const { data } = await axiosApi.get<IClientByIdEdition>(
    clientsEndpointGetById({ clientId })
  );

  return data;
};

export const updateClientById = async ({
  bodyData,
  clientId,
}: {
  bodyData: FormData;
  clientId: number;
}): Promise<IClientEditionResponse> => {
  const { data } = await axiosApi.put<IClientEditionResponse>(
    clientsEndpointGetById({ clientId }),
    bodyData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
};
