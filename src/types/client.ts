import { IGenreClientById, IGenrePromise } from "./genre";
import { IPerson } from "./person";

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

export interface IClientPerson {
  id: number;
  genreId: number;
  firstname: string;
  lastname: string;
  birthdate: string;
  ci: string;
  status: boolean;
  phone: number;
  photo: string;
}

export interface IClientById {
  id: number;
  personId: number;
  weight: string;
  height: string;
  status: boolean;
  email: string;
  Person: IClientPerson;
}

export interface IClientByIdEdition extends Omit<IClientById, "Person"> {
  ci: string;
  birthdate: string;
  firstname: string;
  lastname: string;
  phone: string;
  photo: string;
  Genre: IGenreClientById;
}

export interface IClientEditionResponse {
  message: string;
  updatedClient: IClientPerson;
}
