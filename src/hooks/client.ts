import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getClientById,
  getClientByIdEdition,
  getClients,
  saveClient,
  updateClientById,
} from "../services/clients/clients.service";

export const useClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveClient,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clients-filters"],
      });
    },
  });
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

export const useClientByIdEdition = ({
  clientId,
  isReadyTofetch,
}: {
  clientId: number;
  isReadyTofetch: boolean;
}) => {
  return useQuery({
    queryKey: ["client-info"],
    queryFn: () => getClientByIdEdition({ clientId }),
    enabled: isReadyTofetch,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export const useClientUpdate = () => {
  return useMutation({
    mutationFn: updateClientById,
    mutationKey: ["client-update"],
  });
};
