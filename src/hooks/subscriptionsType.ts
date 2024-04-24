import { useQuery } from "@tanstack/react-query";
import { getSubscriptions } from "../services/subscriptionsType/subscriptionsType.service";

export const useAllSubscriptionsType = () => {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: getSubscriptions,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
