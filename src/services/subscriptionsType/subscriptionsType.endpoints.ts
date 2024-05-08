export const getSubscriptionsEndpoint = () => `/substypes`;

export const deleteSubscriptionEndpoint = (subscriptionId: number): string =>
  `/substypes/${subscriptionId}`;
