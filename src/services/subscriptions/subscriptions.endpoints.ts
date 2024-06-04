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
