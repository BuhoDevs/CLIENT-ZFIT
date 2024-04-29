export interface IPerson {
  id: number;
  firstname: string;
  lastname: string;
  birthdate?: string;
}

export interface IPersonById {
  id: number;
  genreId: number;
  firstname: string;
  lastname: string;
  birthdate: Date | null;
  ci: string;
  status: boolean;
  phone: number | null;
  photo: string | null;
}
