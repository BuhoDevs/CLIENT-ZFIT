import { ISubscriptionByIdParams } from "../../types/suscription";

export const insertSubscriptionEndpoint = () => `/subscriptions`;
export const subscriptionsFiltersEndpoint = () => `/subscriptions/filters`;
export const subscriptionsByIdEndpoint = ({ id }: ISubscriptionByIdParams) =>
  `/subscriptions/${id}`;
