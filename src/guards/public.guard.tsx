import { Navigate, Outlet } from "react-router-dom";
// import { getAuthState } from '../services/storage';

export const PublicGuard = () => {
  // getAuthState();
  const isUserAuthenticated = true;
  return isUserAuthenticated ? <Navigate to={"/dashboard"} /> : <Outlet />;
};

export default PublicGuard;
