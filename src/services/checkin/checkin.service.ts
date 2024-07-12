import axiosApi from "../../config/axios";
import {
  ICurrentAttendanceParams,
  ICurrentAttendanceResponse,
} from "../../types/checkin";
import { currentAttendancesEndpoint } from "./checkin.endpoints";

export const getCurrentAttendances = async ({
  skip,
  take,
}: ICurrentAttendanceParams): Promise<ICurrentAttendanceResponse> => {
  const { data } = await axiosApi.get<ICurrentAttendanceResponse>(
    currentAttendancesEndpoint({ skip, take })
  );
  return data;
};
