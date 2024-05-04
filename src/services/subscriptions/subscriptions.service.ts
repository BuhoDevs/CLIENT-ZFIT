import axiosApi from "../../config/axios";
import {
  IBodySuscription,
  IGetSubscriptionsPromise,
  IPostResponse,
  ISubscriptionByIdParams,
  ISubscriptionByIdResponse,
  ISubscriptionFilters,
} from "../../types/suscription";
import {
  insertSubscriptionEndpoint,
  subscriptionsByIdEndpoint,
  subscriptionsFiltersEndpoint,
} from "./subscriptions.endpoints";
import { subscriptionFiltersParsed } from "./utils";

export const insertSubscription = async (bodyValues: IBodySuscription) => {
  const { data } = await axiosApi.post<IPostResponse>(
    insertSubscriptionEndpoint(),
    bodyValues
  );

  return data;
};

export const getSubscriptionsByFilters = async ({
  subscriptionData,
  skip,
  take,
}: ISubscriptionFilters): Promise<IGetSubscriptionsPromise> => {
  const { data } = await axiosApi.post<IGetSubscriptionsPromise>(
    subscriptionsFiltersEndpoint(),
    subscriptionFiltersParsed({ subscriptionData, skip, take })
  );
  return data;
};

export const getSubscriptionsById = async ({
  id,
}: ISubscriptionByIdParams): Promise<ISubscriptionByIdResponse> => {
  const { data } = await axiosApi.get<ISubscriptionByIdResponse>(
    subscriptionsByIdEndpoint({ id })
  );

  return data;
};
