import { useCallback, useEffect } from "react";
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
  Tmdb.MovieResult[] | null,
  number,
  (page: number) => void,
  number | null,
  boolean | null,
  string | null
] => {
  const endpoints = useSelector((state) => state.movies.endpoints);
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
    const pages = endpoints[endpoint]?.pages;
    if (
      endpoint &&
      (!pages ||
        !(page in pages) ||
        (!pages[page].isFetching && !pages[page].data))
    ) {
      dispatch(fetchMovies({ endpoint, page }));
    }
  }, [endpoint, page, endpoints, dispatch]);

  return [
    endpoints?.[endpoint]?.pages[page]?.data ?? null,
    page,
    setPage,
    endpoints?.[endpoint]?.totalPages,
    endpoints?.[endpoint]?.pages[page]?.isFetching ?? null,
    endpoints?.[endpoint]?.pages[page]?.error ?? null,
  ];
};

export default useMovies;
