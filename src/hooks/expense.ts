import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  editionExpense,
  findExpenseByFilters,
  insertExpense,
} from "../services/expenses/expense.service";
import { IExpenseBodyFilters } from "../types/expense";

export const useGetExpenseByFilters = (values: IExpenseBodyFilters) => {
  return useQuery({
    queryKey: ["expenses-filters", values],
    queryFn: () => findExpenseByFilters(values),
    retry: 1,
    enabled: values.isReadyToFetch,
    refetchOnWindowFocus: false,
  });
};

export const usePostExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["expenses-insert"],
    mutationFn: insertExpense,
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        {
          queryKey: ["expenses-filters"],
          // exact: true,
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

export const useEditionExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["expense-patch"],
    mutationFn: editionExpense,
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        {
          queryKey: ["expenses-filters"],
          // exact: true,
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
