import axiosApi from "../../config/axios";
import {
  ICreateExpense,
  IExpenseBodyFilters,
  IGetExpensesPromise,
} from "../../types/expense";
import { IPostResponse } from "../../types/suscription";
import {
  createExpenseEndpoint,
  expenseByFiltersEndpoint,
} from "./expense.endpoints";
import { expenseFilterParsed } from "./utils";

export const findExpenseByFilters = async ({
  expenseData,
  skip,
  take,
}: IExpenseBodyFilters): Promise<IGetExpensesPromise> => {
  const { data } = await axiosApi.post<IGetExpensesPromise>(
    expenseByFiltersEndpoint(),
    expenseFilterParsed({ expenseData, skip, take })
  );

  return data;
};

export const insertExpense = async (
  bodyData: ICreateExpense
): Promise<IPostResponse> => {
  const { data } = await axiosApi.post(createExpenseEndpoint(), bodyData);
  return data;
};
