import { useQuery } from "@tanstack/react-query";
import { getMonthyRevenue } from "../services/payments/payments.service";

export const useGetMonthlyRevenue = () => {
  return useQuery({
    queryKey: ["monthly-revenue"],
    queryFn: getMonthyRevenue,
    retry: 1,
    refetchOnWindowFocus: true,
    enabled: true,
  });
};
