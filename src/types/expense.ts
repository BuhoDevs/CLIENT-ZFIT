import { IExpenseCategories } from "./expenseCategories";

export interface IExpenseFormFilter {
  description?: string;
  Category?: IExpenseCategories;
  startDate?: string;
  endDate?: string;
}

export interface IExpenseFilterData {
  categoryId?: number;
  description?: string;
  endDate?: string;
  startDate?: string;
}

export interface IExpenseBodyFilters {
  expenseData: IExpenseFilterData;
  skip: number;
  take: number;
  isReadyToFetch?: boolean;
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

export interface ICreateExpenseForm {
  amount: number;
  description: string;
  Category: IExpenseCategories;
}
export interface ICreateExpense {
  amount: number;
  description: string;
  categoryId: number;
}
