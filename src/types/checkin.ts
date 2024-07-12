export interface ICurrentAttendanceParams {
  take: number;
  skip: number;
}

export interface IDiscipline {
  label: string;
}

export interface IAttendanceData {
  firstname: string;
  lastname: string;
  photo: string;
  Discipline: IDiscipline;
  createdAt: string;
  display_name: string;
}

export interface ICurrentAttendanceResponse {
  attendances: IAttendanceData[];
  totalLength: number;
}

export interface ICurrentAttendanceDatatable extends IAttendanceData {}
