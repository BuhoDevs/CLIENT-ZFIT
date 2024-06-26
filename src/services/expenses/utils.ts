import { IExpenseBodyFilters } from "../../types/expense";

export const expenseFilterParsed = ({
  expenseData,
  skip,
  take,
}: IExpenseBodyFilters) => {
  return {
    ...(expenseData.categoryId && { categoryId: expenseData.categoryId }),
    ...(expenseData.description && { description: expenseData.description }),
    ...(expenseData.startDate && { startDate: expenseData.startDate }),
    ...(expenseData.endDate && { endDate: expenseData.endDate }),
    skip,
    take,
  };
};
