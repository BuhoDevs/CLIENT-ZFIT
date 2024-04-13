import axiosApi from "../../config/axios";
import { IGenrePromise } from "../../types/genre";
import { genresEndpointGetAll } from "./genres.endpoints";

export const getAllGenres = async (): Promise<IGenrePromise[]> => {
  const { data } = await axiosApi.get<IGenrePromise[]>(genresEndpointGetAll());
  return data;
};
