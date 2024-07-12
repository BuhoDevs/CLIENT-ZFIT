import { ICurrentAttendanceParams } from "../../types/checkin";

const checkinPath = "/checkin";
export const currentAttendancesEndpoint = ({
  skip,
  take,
}: ICurrentAttendanceParams) =>
  `${checkinPath}/attendances-current?skip=${skip}&take=${take}`;
