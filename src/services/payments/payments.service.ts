import axiosApi from "../../config/axios";
import { IMonthlyRevenueResponse } from "../../types/payment";
import { monthlyRevenueEndpoint } from "./payments.endpoints";

export const getMonthyRevenue = async (): Promise<IMonthlyRevenueResponse> => {
  const { data } = await axiosApi.get<IMonthlyRevenueResponse>(
    monthlyRevenueEndpoint()
  );
  return data;
};
