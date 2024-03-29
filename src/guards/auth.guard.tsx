import { Navigate, Outlet } from "react-router-dom";
// import { getAuthState } from '../services/storage';

export const AuthGuard = () => {
  // getAuthState();
  const isUserAuthenticated = true;

  return isUserAuthenticated ? <Outlet /> : <Navigate to={"/auth"} />;
};

export default AuthGuard;
