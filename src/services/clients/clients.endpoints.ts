export const clientsEndpointGetAll = () => `/clients`;
export const clientsEndpointSave = () => `/clients/register`;
export const clientsEndpointGetById = ({ clientId }: { clientId: number }) =>
  `clients/${clientId}`;
