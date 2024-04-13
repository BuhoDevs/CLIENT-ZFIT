import { useMutation } from "@tanstack/react-query";
import { saveClient } from "../services/clients/clients.service";

export const useClient = () => {
  return useMutation({ mutationFn: saveClient });
};
