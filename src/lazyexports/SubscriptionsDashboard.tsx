import { lazy } from "react";

const SubscriptionsDashLazy = lazy(
  () => import("../views/admin/subscriptions")
);

export default SubscriptionsDashLazy;
