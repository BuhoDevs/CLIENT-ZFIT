import { useMutation } from "@tanstack/react-query";
import {
  getSubscriptionsByFilters,
  insertSubscription,
} from "../services/subscriptions/subscriptions.service";

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
