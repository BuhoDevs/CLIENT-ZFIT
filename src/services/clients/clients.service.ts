import axiosApi from "../../config/axios";
import { IClient } from "../../types/client";
import { clientsEndpointSave } from "./clients.endpoints";

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
