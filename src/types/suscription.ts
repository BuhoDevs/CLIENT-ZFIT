import { IDisciplines } from "./disciplines";
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

export interface ISubscriptionDataTable {
  id: number;
  dateIn: string;
  dateOut: string;
  status: boolean;
  disciplineId: number;
  clientId: number;
  subsTypeId: number;
  subscriptorId: number;
  createdAt: string;
  Client: {
    Person: IPerson;
  };
  SubsType: ISubscriptionsType;
  User: {
    Person: IPerson;
  };
  Discipline: IDisciplines;
}

export interface IGetSubscriptionsPromise {
  totalLength: number;
  subscriptions: ISubscriptionDataTable[];
}
