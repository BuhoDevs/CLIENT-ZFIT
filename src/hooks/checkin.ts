import { useQuery } from "@tanstack/react-query";
import { getCurrentAttendances } from "../services/checkin/checkin.service";
import { ICurrentAttendanceParams } from "../types/checkin";

export const useGetCurrentAttendances = (params: ICurrentAttendanceParams) => {
  return useQuery({
    queryKey: ["cuurent-attendances"],
    queryFn: () => getCurrentAttendances(params),
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: true,
  });
};
