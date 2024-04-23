import { lazy } from "react";

const NewSubscriptionLazy = lazy(
  () => import("../views/admin/subscriptions/new")
);

export default NewSubscriptionLazy;
