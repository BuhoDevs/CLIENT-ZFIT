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

export const useClientId = (clientId: number) => {
  return useQuery({
    queryKey: ["client", clientId],
    queryFn: () => getClientById(clientId),
  });
};
