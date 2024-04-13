import { useQuery } from "@tanstack/react-query";
import { getAllGenres } from "../services/genres/genres.service";

export const useGenre = () => {
  return useQuery({ queryKey: ["genres"], queryFn: getAllGenres });
};
