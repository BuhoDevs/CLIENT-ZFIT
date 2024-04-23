import { IClientFilters } from "../../types/client";

export const clientFiltersParsed = ({
  clientData,
  skip = 1,
  take = 10,
}: IClientFilters) => {
  return {
    ...(clientData.ci && { ci: clientData.ci }),
    ...(clientData.firstname && { firstname: clientData.firstname }),
    ...(clientData.lastname && { lastname: clientData.lastname }),
    skip,
    take,
  };
};
