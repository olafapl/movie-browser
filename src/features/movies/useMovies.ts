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
  const { endpoints, error, isFetching } = useSelector((state) => state.movies);
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
    const pages = endpoints[endpoint]?.pages ?? {};
    if (endpoint && !(page in pages)) {
      dispatch(fetchMovies({ endpoint, page }));
    }
  }, [endpoint, page, endpoints, dispatch]);

  return [
    endpoints?.[endpoint]?.pages[page] ?? null,
    page,
    setPage,
    endpoints?.[endpoint]?.totalPages,
    isFetching,
    error,
  ];
};

export default useMovies;
