export interface IBalanceFilter {
  startDate: string;
  endDate: string;
}

export interface ISubscriptionBalance {
  discipline: string;
  subsType: string;
  totalAmount: number;
  count: number;
}

export interface IExpenseBalance {
  category: string;
  totalAmount: number;
  count: number;
}
export interface IPromiseIncomeExpense {
  subscriptionBalance: ISubscriptionBalance[];
  expenseBalance: IExpenseBalance[];
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
}

export interface ISubscriptionBalanceDataTable extends ISubscriptionBalance {}
export interface IExpenseBalanceDataTable extends IExpenseBalance {}
export interface IBalanceExport {
  startDate?: string;
  endDate?: string;
  filename?: string;
}
