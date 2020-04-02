import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies } from "features/movies/moviesSlice";
import useSelector from "hooks/useSelector";
import useQueryParam from "hooks/useQueryParam";

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
  const results = useSelector(state => state.movies[endpoint]);
  const dispatch = useDispatch();
  const [pageParam, setPageParam] = useQueryParam("page");
  const page = Number.parseInt(pageParam as string) || 1;

  const setPage = useCallback(
    (page: number) => {
      setPageParam(page.toString());
    },
    [setPageParam]
  );

  useEffect(() => {
    if (
      endpoint &&
      (!results || (!results.isFetching && !(page in results.pages)))
    ) {
      dispatch(fetchMovies(endpoint, page));
    }
  }, [results, endpoint, page, dispatch]);

  if (results) {
    const { pages, isFetching, totalPages, error } = results;
    return [pages[page] ?? null, page, setPage, totalPages, isFetching, error];
  } else {
    return [null, page, setPage, null, null, null];
  }
};

export default useMovies;
