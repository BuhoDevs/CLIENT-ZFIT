import { useMutation } from "@tanstack/react-query";
import { findExpenseByFilters } from "../services/expenses/expense.service";

export const useGetExpenseByFilters = () => {
  return useMutation({
    mutationKey: ["expenses-filters"],
    mutationFn: findExpenseByFilters,
  });
};
