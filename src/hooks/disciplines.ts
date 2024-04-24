import { useQuery } from "@tanstack/react-query";
import { getDisciplines } from "../services/disciplines/disciplines.service";

export const useDisciplines = () => {
  return useQuery({
    queryKey: ["disciplines"],
    queryFn: getDisciplines,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
