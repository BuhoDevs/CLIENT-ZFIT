import { Navigate, Outlet } from "react-router-dom";
import { getAuthState } from "../utilities";

export const AuthGuard = () => {
  const isUserAuthenticated = getAuthState();

  return isUserAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AuthGuard;
