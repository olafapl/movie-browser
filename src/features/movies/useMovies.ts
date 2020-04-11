import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useQueryParam, NumberParam } from "use-query-params";
import { fetchMovies } from "features/movies/moviesSlice";
import useSelector from "hooks/useSelector";

/**
 * @param endpoint TMDB API endpoint to fetch movies from.
 */
const useMovies = (
  endpoint: string
): [
  Tmdb.MovieListResult[] | null,
  number,
  (page: number) => void,
  number | null,
  boolean | null,
  string | null
] => {
  const [argDate, setArgDate] = useState(new Date().getTime());
  const endpointState = useSelector(
    (state) => state.movies.endpoints[endpoint]
  );
  const dispatch = useDispatch();
  const [pageParam, setPageParam] = useQueryParam("page", NumberParam);
  const page = pageParam ?? 1;
  const setPage = useCallback(
    (page: number) => {
      setPageParam(page, "pushIn");
    },
    [setPageParam]
  );

  useEffect(() => {
    setArgDate(new Date().getTime());
    window.scrollTo(0, 0);
  }, [endpoint, page]);

  useEffect(() => {
    const pages = endpointState?.pages;
    if (
      endpoint &&
      !pages?.[page]?.isFetching &&
      !pages?.[page]?.data &&
      (!pages?.[page]?.fetchDate || pages[page].fetchDate! < argDate)
    ) {
      dispatch(fetchMovies({ endpoint, page }));
    }
  }, [endpoint, page, argDate, endpointState, dispatch]);

  return [
    endpointState?.pages[page]?.data ?? null,
    page,
    setPage,
    endpointState?.totalPages,
    endpointState?.pages[page]?.isFetching ?? null,
    endpointState?.pages[page]?.error ?? null,
  ];
};

export default useMovies;
