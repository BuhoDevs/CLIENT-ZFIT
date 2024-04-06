import { Navigate, Outlet } from "react-router-dom";
import { getAuthState } from "../utilities";

export const PublicGuard = () => {
  const isUserAuthenticated = getAuthState();
  return isUserAuthenticated ? <Navigate to={"/dashboard"} /> : <Outlet />;
};

export default PublicGuard;
