import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getClientById,
  getClients,
  saveClient,
} from "../services/clients/clients.service";

export const useClient = () => {
  return useMutation({ mutationFn: saveClient });
};

export const useAllClients = () => {
  return useMutation({
    mutationFn: getClients,
    mutationKey: ["clients-filters"],
  });
};

export const useClientById = ({
  clientId,
  isReadyTofetch,
}: {
  clientId: number;
  isReadyTofetch: boolean;
}) => {
  return useQuery({
    queryKey: ["client-by-id"],
    queryFn: () => getClientById({ clientId }),
    enabled: isReadyTofetch,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
