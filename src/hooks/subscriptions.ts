import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentSubscriptionsByCi,
  getIncomeExpenseReport,
  getSubscriptionsByFilters,
  getSubscriptionsById,
  insertSubscription,
  postDisciplineCheckin,
  updateSubscription,
} from "../services/subscriptions/subscriptions.service";
import {
  ISubscriptionByCiParams,
  ISubscriptionByIdParams,
} from "../types/suscription";
import { IBalanceFilter } from "../types/balance";

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

export const useCurrentSubscriptionsByCi = ({
  ci,
  isReadyToFetch = false,
}: ISubscriptionByCiParams) => {
  return useQuery({
    queryFn: () => getCurrentSubscriptionsByCi({ ci }),
    queryKey: ["current-subscriptionsBy-ci"],
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: isReadyToFetch,
  });
};

export const useCheckinPost = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["checkin"],
    mutationFn: postDisciplineCheckin,
    // onSuccess: async () => {
    //   await queryClient.invalidateQueries(
    //     {
    //       queryKey: ["current-subscriptionsBy-ci"],
    //       exact: true,
    //       refetchType: "active",
    //     },
    //     {
    //       throwOnError: true,
    //       cancelRefetch: true,
    //     }
    //   );
    // },
  });
};

export const useIncomeExpense = ({ startDate, endDate }: IBalanceFilter) => {
  return useQuery({
    queryKey: ["income-expense"],
    queryFn: () => getIncomeExpenseReport({ startDate, endDate }),
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
