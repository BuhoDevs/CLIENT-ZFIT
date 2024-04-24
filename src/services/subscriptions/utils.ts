import { ISubscriptionFilters } from "../../types/suscription";

export const subscriptionFiltersParsed = ({
  subscriptionData,
  skip = 1,
  take = 10,
}: ISubscriptionFilters) => {
  return {
    ...(subscriptionData.ci && { ci: subscriptionData.ci }),
    ...(subscriptionData.firstname && {
      firstname: subscriptionData.firstname,
    }),
    ...(subscriptionData.lastname && { lastname: subscriptionData.lastname }),
    ...(subscriptionData.disciplineId && {
      disciplineId: subscriptionData.disciplineId,
    }),
    ...(subscriptionData.subsTypeId && {
      subsTypeId: subscriptionData.subsTypeId,
    }),
    ...(subscriptionData.subscriptorId && {
      subscriptorId: subscriptionData.subscriptorId,
    }),
    ...(subscriptionData.dateIn && {
      dateIn: subscriptionData.dateIn,
    }),
    ...(subscriptionData.dateOut && {
      dateOut: subscriptionData.dateOut,
    }),
    ...(subscriptionData.status && {
      status: subscriptionData.status,
    }),
    skip,
    take,
  };
};
