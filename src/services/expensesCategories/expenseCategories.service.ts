import axiosApi from "../../config/axios";
import { IExpenseCategories } from "../../types/expenseCategories";
import { allExpenseCategoriesEndpoint } from "./expenseCategories.endpoints";

export const getAllExpenseCategories = async (): Promise<
  IExpenseCategories[]
> => {
  const { data } = await axiosApi.get<IExpenseCategories[]>(
    allExpenseCategoriesEndpoint()
  );
  return data;
};
