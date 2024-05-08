import axiosApi from "../../config/axios";
import { ISubscriptionsType } from "../../types/subscriptionsType";
import {
  deleteSubscriptionEndpoint,
  getSubscriptionsEndpoint,
} from "./subscriptionsType.endpoints";

export const getSubscriptions = async (): Promise<ISubscriptionsType[]> => {
  const { data } = await axiosApi.get<ISubscriptionsType[]>(
    getSubscriptionsEndpoint()
  );

  return data;
};

export const deleteSubscriptionById = async (
  subscriptionId: number
): Promise<void> => {
  await axiosApi.delete(deleteSubscriptionEndpoint(subscriptionId));
};
