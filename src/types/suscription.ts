import { IClientById, IClientPerson } from "./client";
import { IDisciplines } from "./disciplines";
import { IPayment } from "./payment";
import { IPerson } from "./person";
import { ISubscriptionsType } from "./subscriptionsType";

export interface IBodySuscription {
  dateIn: string;
  dateOut: string;
  disciplineId: number;
  clientId: number;
  subsTypeId: number;
  subscriptorId: number;
  transactionAmmount: number;
  outstanding: number;
  totalAmmount: number;
}

export interface IPostResponse {
  message: string;
}

export interface IFormSuscriptionData {
  dateIn: string;
  dateOut: string;
  discipline: IDisciplines;
  outstanding: number;
  subscriptionType: ISubscriptionsType;
  totalAmmount: number;
  transactionAmmount: number;
}

export interface ISubscriptionDataFilters {
  disciplineId?: number;
  ci?: string;
  firstname?: string;
  lastname?: string;
  subsTypeId?: number;
  subscriptorId?: number;
  dateIn?: string;
  dateOut?: string;
  status: boolean;
}

export interface ISubscriptionFilters {
  subscriptionData: ISubscriptionDataFilters;
  skip: number;
  take: number;
}

export interface ISubscriptionsKeys {
  id: number;
  dateIn: string;
  dateOut: string;
  status: boolean;
  disciplineId: number;
  clientId: number;
  subsTypeId: number;
  subscriptorId: number;
  createdAt: string;
  Client: IClientById;
  SubsType: ISubscriptionsType;
  Discipline: IDisciplines;
}

export interface ISubscriptionDataTable extends ISubscriptionsKeys {
  User: {
    Person: IPerson;
  };
}

export interface IGetSubscriptionsPromise {
  totalLength: number;
  subscriptions: ISubscriptionDataTable[];
}

export interface ISubscriptionByIdParams {
  id: number;
  isReadyToFetch?: boolean;
}

export interface ISubscriptionByIdResponse extends ISubscriptionsKeys {
  Payment: IPayment[];
}

export interface IPutSubscription extends IBodySuscription {
  id: number;
}

export interface IPutResponse extends IPostResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscripEdit: any;
}

export interface ISubscriptionByCiParams {
  ci: string;
  isReadyToFetch?: boolean;
}

export interface IDisciplinesSubscription {
  label: string;
}
export interface ICurrentSubscriptions {
  id: number;
  Discipline: IDisciplinesSubscription;
}

export interface ICurrentSubscriptionsResponse extends IClientPerson {
  Client: Omit<IClientById, "Person">;
  subscriptions: ICurrentSubscriptions[];
}

export interface IPostCheckin {
  ci: string;
  subscriptionId: number;
}
