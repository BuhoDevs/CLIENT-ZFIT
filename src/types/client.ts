import { IGenrePromise } from "./genre";
import { IPerson, IPersonById } from "./person";

export interface IClient {
  id: number;
  personId: IPerson;
  weight: number;
  status: boolean;
  email: string;
  password: string;
  height: number;
}

export interface IClientRequestBody {
  firstname: string;
  lastname: string;
  birthdate: string;
  ci: string;
  phone: number;
  photo: string;
  genre?: IGenrePromise;
  genreId: number;
  weight: number;
  height: number;
  email: string;
  password: string;
}

export interface IClientDataTable {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: string;
  ci: string;
  phone: number;
  email: string;
  photo: string;
  status: boolean;
}

export interface IGetClientPromise {
  totalLength: number;
  clients: IClientDataTable[];
}

export interface IClientDataFilters {
  ci?: string;
  firstname?: string;
  lastname?: string;
}
export interface IClientFilters {
  clientData: IClientDataFilters;
  skip: number;
  take: number;
}

export interface IClientById {
  id: number;
  Person: IPersonById;
  weight: number;
  status: boolean;
  email: string;
  password: string;
  height: number;
}
