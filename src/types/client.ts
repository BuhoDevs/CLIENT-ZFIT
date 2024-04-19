import { IGenrePromise } from "./genre";
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
  firstname: string;
  lastname: string;
  birthdate: string;
  ci: string;
  phone: number;
  email: string;
  photo: string;
}

export interface IGetClientPromise {
  message: string;
  client: IClient[];
}
