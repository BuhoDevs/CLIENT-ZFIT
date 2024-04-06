import { useMutation } from "@tanstack/react-query";

import { loginService } from "../services/auth/auth.service";

export const useLogin = () => {
  return useMutation({ mutationFn: loginService });
};
