import axiosApi from "../../config/axios";
import {
  ICreateExpense,
  IEditionRequestData,
  IExpenseBodyFilters,
  IGetExpensesPromise,
} from "../../types/expense";
import { IPostResponse } from "../../types/suscription";
import {
  createExpenseEndpoint,
  editionExpenseEndpoint,
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
  const { data } = await axiosApi.post<IPostResponse>(
    createExpenseEndpoint(),
    bodyData
  );
  return data;
};

export const editionExpense = async ({
  id,
  bodyData,
}: IEditionRequestData): Promise<IPostResponse> => {
  const { data } = await axiosApi.patch<IPostResponse>(
    editionExpenseEndpoint(id),
    bodyData
  );
  return data;
};
