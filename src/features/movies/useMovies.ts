import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
  const [page, setPage] = useState(1);
  const results = useSelector(state => state.movies[endpoint]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (endpoint) {
      dispatch(fetchMovies(endpoint, page));
    }
  }, [endpoint, page, dispatch]);

  if (results) {
    const { pages, isFetching, totalPages, error } = results;
    return [pages[page] ?? [], page, setPage, totalPages, isFetching, error];
  } else {
    return [null, page, setPage, null, null, null];
  }
};

export default useMovies;
