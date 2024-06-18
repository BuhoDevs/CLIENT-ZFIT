import { apiUrls } from "../../config/urls";
import { IBalanceExport, IBalanceFilter } from "../../types/balance";
import {
  IPostCheckin,
  ISubscriptionByCiParams,
  ISubscriptionByIdParams,
} from "../../types/suscription";

export const insertSubscriptionEndpoint = () => `/subscriptions`;

export const subscriptionsFiltersEndpoint = () => `/subscriptions/filters`;

export const subscriptionsByIdEndpoint = ({ id }: ISubscriptionByIdParams) =>
  `/subscriptions/${id}`;

export const putSubscriptionsEndpoint = ({ id }: ISubscriptionByIdParams) =>
  `/subscriptions/${id}`;

export const getCurrentSubscriptionsByCiEndpoint = ({
  ci,
}: ISubscriptionByCiParams) => `/subscriptions/ci/${ci}`;

export const ICheckinEndpoint = ({ ci, subscriptionId }: IPostCheckin) =>
  `/checkin/${ci}/${subscriptionId}`;

export const IncomeExpenseEndpoint = ({
  startDate = "",
  endDate = "",
}: IBalanceFilter) => {
  const URL = `/subscriptions/balance/income-expense`;
  if (startDate && endDate)
    return URL + `?startDate=${startDate}&endDate=${endDate}`;

  if (startDate) return URL + `?startDate=${startDate}`;

  if (endDate) return URL + `?endDate=${endDate}`;

  return URL;
};

export const BalanceExportEndpoint = ({
  startDate,
  endDate,
}: IBalanceExport) => {
  const URL = `${apiUrls.backend}/balances/reports/export`;
  if (startDate && endDate)
    return URL + `?startDate=${startDate}&endDate=${endDate}`;

  if (startDate) return URL + `?startDate=${startDate}`;

  if (endDate) return URL + `?endDate=${endDate}`;

  return URL;
};
