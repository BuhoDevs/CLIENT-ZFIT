import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSubscriptionsByFilters,
  getSubscriptionsById,
  insertSubscription,
  updateSubscription,
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

export const usePutSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSubscription,
    mutationKey: ["put-subscription"],
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        {
          queryKey: ["subscriptions-by-id", "subscriptions-filters"],
          exact: true,
          refetchType: "active",
        },
        {
          throwOnError: true,
          cancelRefetch: true,
        }
      );
    },
  });
};
