import { lazy } from "react";

const ExpenseDashLazy = lazy(() => import("../views/admin/expense"));

export default ExpenseDashLazy;
