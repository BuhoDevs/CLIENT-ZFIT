import { lazy } from "react";

const NewClient = lazy(
  () => import("../views/admin/clients/components/newClient")
);

export default NewClient;
