import axiosApi from "../../config/axios";
import { IBalanceFilter, IPromiseIncomeExpense } from "../../types/balance";
import {
  IActiveMembersResponse,
  IBodySuscription,
  ICurrentSubscriptionsResponse,
  IExpiringSoonResponse,
  IExpiringsoonParams,
  IGetSubscriptionsPromise,
  INewMembersResponse,
  IPostCheckin,
  IPostResponse,
  IPutResponse,
  IPutSubscription,
  ISubscriptionByCiParams,
  ISubscriptionByIdParams,
  ISubscriptionByIdResponse,
  ISubscriptionFilters,
} from "../../types/suscription";
import {
  ICheckinEndpoint,
  IncomeExpenseEndpoint,
  activeMembersEndpoint,
  expiringSoonEndpoint,
  getCurrentSubscriptionsByCiEndpoint,
  insertSubscriptionEndpoint,
  putSubscriptionsEndpoint,
  subscriptionsByIdEndpoint,
  subscriptionsFiltersEndpoint,
  totalNewMembersEndpoint,
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

export const updateSubscription = async ({
  id,
  ...resData
}: IPutSubscription): Promise<IPutResponse> => {
  const { data: putResponse } = await axiosApi.put<IPutResponse>(
    putSubscriptionsEndpoint({ id }),
    resData
  );

  return putResponse;
};

export const getCurrentSubscriptionsByCi = async ({
  ci,
}: ISubscriptionByCiParams): Promise<ICurrentSubscriptionsResponse> => {
  const { data } = await axiosApi.get<ICurrentSubscriptionsResponse>(
    getCurrentSubscriptionsByCiEndpoint({ ci })
  );
  return data;
};

export const postDisciplineCheckin = async ({
  ci,
  subscriptionId,
}: IPostCheckin): Promise<IPostResponse> => {
  const { data } = await axiosApi.post<IPostResponse>(
    ICheckinEndpoint({ ci, subscriptionId })
  );

  return data;
};

export const getIncomeExpenseReport = async ({
  endDate,
  startDate,
}: IBalanceFilter): Promise<IPromiseIncomeExpense> => {
  const { data } = await axiosApi.get<IPromiseIncomeExpense>(
    IncomeExpenseEndpoint({ startDate, endDate })
  );

  return data;
};

export const getExpiringSoon = async ({
  skip,
  take,
}: IExpiringsoonParams): Promise<IExpiringSoonResponse> => {
  const { data } = await axiosApi.get<IExpiringSoonResponse>(
    expiringSoonEndpoint({ skip, take })
  );
  return data;
};

export const getTotalActiveMembers =
  async (): Promise<IActiveMembersResponse> => {
    const { data } = await axiosApi.get<IActiveMembersResponse>(
      activeMembersEndpoint()
    );
    return data;
  };

export const getTotalNewMembersThisMonth =
  async (): Promise<INewMembersResponse> => {
    const { data } = await axiosApi.get<INewMembersResponse>(
      totalNewMembersEndpoint()
    );
    return data;
  };
