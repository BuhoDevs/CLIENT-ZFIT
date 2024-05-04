import axiosApi from "../../config/axios";
import { IDisciplines } from "../../types/disciplines";
import { getDisciplinesEndpoint } from "./disciplines.endpoints";

export const getDisciplines = async (): Promise<IDisciplines[]> => {
  const { data } = await axiosApi.get<IDisciplines[]>(getDisciplinesEndpoint());
  return data;
};
