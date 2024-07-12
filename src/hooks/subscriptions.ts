import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentSubscriptionsByCi,
  getExpiringSoon,
  getIncomeExpenseReport,
  getSubscriptionsByFilters,
  getSubscriptionsById,
  getTotalActiveMembers,
  getTotalNewMembersThisMonth,
  insertSubscription,
  postDisciplineCheckin,
  updateSubscription,
} from "../services/subscriptions/subscriptions.service";
import {
  IExpiringsoonParams,
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
  return useMutation({
    mutationKey: ["checkin"],
    mutationFn: postDisciplineCheckin,
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

export const useGetExpiringSoon = (params: IExpiringsoonParams) => {
  return useQuery({
    queryKey: ["expiring-soon"],
    queryFn: () => getExpiringSoon(params),
    retry: 1,
    refetchOnWindowFocus: true,
    enabled: true,
  });
};

export const useGetTotalActiveMembers = () => {
  return useQuery({
    queryKey: ["active-members"],
    queryFn: getTotalActiveMembers,
    retry: 1,
    refetchOnWindowFocus: true,
    enabled: true,
  });
};
export const useGetTotalNewMembersThisMonth = () => {
  return useQuery({
    queryKey: ["new-members-thisMonth"],
    queryFn: getTotalNewMembersThisMonth,
    retry: 1,
    refetchOnWindowFocus: true,
    enabled: true,
  });
};
