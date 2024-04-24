import axiosApi from "../../config/axios";
import { ISubscriptionsType } from "../../types/subscriptionsType";
import { getSubscriptionsEndpoint } from "./subscriptionsType.endpoints";

export const getSubscriptions = async (): Promise<ISubscriptionsType[]> => {
  const { data } = await axiosApi.get<ISubscriptionsType[]>(
    getSubscriptionsEndpoint()
  );

  return data;
};
