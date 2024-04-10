import { lazy } from "react";

const ClientsDashLazy = lazy(() => import("../views/admin/clients"));

export default ClientsDashLazy;
