import { useQuery } from "@tanstack/react-query";
import { getAllExpenseCategories } from "../services/expensesCategories/expenseCategories.service";

export const useAllExpenseCategories = () => {
  return useQuery({
    queryKey: ["expense-categories"],
    queryFn: getAllExpenseCategories,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
