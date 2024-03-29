import { lazy } from "react";

const PatientsDashLazy = lazy(() => import("../views/admin/dataTables"));

export default PatientsDashLazy;
