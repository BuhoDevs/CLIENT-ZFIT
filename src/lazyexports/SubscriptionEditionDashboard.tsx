import { lazy } from "react";

const SubscriptionEditionLazy = lazy(
  () => import("../views/admin/subscriptions/edition")
);

export default SubscriptionEditionLazy;
