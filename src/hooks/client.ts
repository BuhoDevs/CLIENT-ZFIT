import { useMutation } from "@tanstack/react-query";
import { getClients, saveClient } from "../services/clients/clients.service";

export const useClient = () => {
  return useMutation({ mutationFn: saveClient });
};

export const useAllClients = () => {
  return useMutation({
    mutationFn: getClients,
    mutationKey: ["clients-filters"],
  });
};
