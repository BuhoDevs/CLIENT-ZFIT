export interface IPayment {
  id: number;
  transactionAmmount: number;
  totalAmmount: number;
  outstanding: number;
  discount?: number;
  status: boolean;
  subscriptionId: number;
}
