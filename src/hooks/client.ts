import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllClients, saveClient } from "../services/clients/clients.service";

export const useClient = () => {
  return useMutation({ mutationFn: saveClient });
};

export const useAllClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: getAllClients,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
