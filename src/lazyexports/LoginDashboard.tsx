import { lazy } from "react";

const LoginDashLazy = lazy(() => import("../views/auth/signIn"));

export default LoginDashLazy;
