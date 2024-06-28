import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  findExpenseByFilters,
  insertExpense,
} from "../services/expenses/expense.service";
import { IExpenseBodyFilters } from "../types/expense";

// export const useGetExpenseByFilters = () => {
//   return useMutation({
//     mutationKey: ["expenses-filters"],
//     mutationFn: findExpenseByFilters,
//   });
// };

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
