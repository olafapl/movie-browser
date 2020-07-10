import { useCallback } from "react";
import { useQuery, QueryStatus } from "react-query";
import { useQueryParams, StringParam, NumberParam } from "use-query-params";
import { searchMovies } from "common/tmdbApi";

const useSearch = (): [
  Tmdb.MovieListResult[] | undefined,
  string,
  (query: string) => void,
  number,
  (page: number) => void,
  number | undefined,
  QueryStatus,
  string | undefined
] => {
  const [queryParams, setQueryParams] = useQueryParams({
    query: StringParam,
    page: NumberParam,
  });
  const query = queryParams.query ?? "";
  const setQuery = useCallback(
    (query: string) => {
      setQueryParams({ query }, "push");
    },
    [setQueryParams]
  );
  const page = queryParams.page ?? 1;
  const setPage = useCallback(
    (page: number) => {
      setQueryParams({ page });
    },
    [setQueryParams]
  );
  const { status, data, error } = useQuery(["search", query, page], () =>
    searchMovies(query, page)
  );

  return [
    data?.results,
    query,
    setQuery,
    page,
    setPage,
    data?.total_pages,
    status,
    error?.message,
  ];
};

export default useSearch;
