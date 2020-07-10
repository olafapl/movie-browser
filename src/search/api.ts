import { fetchPaginated } from "common/api";
import { MovieListResult } from "movies/api";

export const searchMovies = (query: string, page: number) => {
  return fetchPaginated<MovieListResult>("search/movie", page, [
    { key: "query", value: query },
  ]);
};
