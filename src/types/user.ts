import { IPerson } from "./person";
import { IRole } from "./role";

export interface IUser {
  id: number;
  email: string;
  roleId: number;
  personId: number;
  Role: IRole;
  Person: IPerson;
}
