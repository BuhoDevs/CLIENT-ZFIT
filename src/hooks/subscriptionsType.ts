import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteSubscriptionById,
  getSubscriptions,
} from "../services/subscriptionsType/subscriptionsType.service";

export const useAllSubscriptionsType = () => {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: getSubscriptions,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubscriptionById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscriptions"],
      });
    },
  });
};
