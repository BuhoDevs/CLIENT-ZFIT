import { IExpenseCategories } from "./expenseCategories";

export interface IExpenseFormFilter {
  description?: string;
  Category: IExpenseCategories;
  startDate: string;
  endDate: string;
}

export interface IExpenseFilterData
  extends Omit<IExpenseFormFilter, "Category"> {
  categoryId?: number;
}

export interface IExpenseBodyFilters {
  expenseData: IExpenseFilterData;
  skip: number;
  take: number;
}

export interface IExpenseDataTable {
  id: number;
  amount: string;
  description: string;
  categoryId: number;
  createdAt: string;
  category: IExpenseCategories;
}

export interface IGetExpensesPromise {
  totalLength: number;
  expenses: IExpenseDataTable[];
}
