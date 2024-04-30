import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getSubscriptionsByFilters,
  getSubscriptionsById,
  insertSubscription,
} from "../services/subscriptions/subscriptions.service";
import { ISubscriptionByIdParams } from "../types/suscription";

export const usePostSubscription = () => {
  return useMutation({
    mutationFn: insertSubscription,
    mutationKey: ["insert-subscription"],
  });
};

export const useGetSubscriptionsByFilters = () => {
  return useMutation({
    mutationFn: getSubscriptionsByFilters,
    mutationKey: ["subscriptions-filters"],
  });
};

export const useGetSubscriptionsById = ({
  id,
  isReadyToFetch = false,
}: ISubscriptionByIdParams) => {
  return useQuery({
    queryFn: () => getSubscriptionsById({ id }),
    queryKey: ["subscriptions-by-id", { id }],
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: isReadyToFetch,
  });
};
