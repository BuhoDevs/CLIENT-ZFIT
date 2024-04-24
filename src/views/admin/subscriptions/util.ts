import { IFormSuscriptionData } from "../../../types/suscription";

export const subscriptionDataExtractor = (
  subscriptionData: IFormSuscriptionData
) => {
  const { discipline, subscriptionType, ...restValues } = subscriptionData;
  return {
    ...restValues,
    disciplineId: discipline.id,
    subsTypeId: subscriptionType.id,
  };
};
