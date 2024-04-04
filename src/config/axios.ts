import Axios from "axios";
import { apiUrls } from "./urls";
import { getInLocalStorage } from "../utilities";

export const axiosApi = Axios.create({
  baseURL: apiUrls.backend,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosApi.interceptors.request.use((request) => {
  const token = getInLocalStorage("token") || "token_de_prueba";
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

export default axiosApi;
