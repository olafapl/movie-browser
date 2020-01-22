import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies } from "features/movies/moviesSlice";
import useSelector from "hooks/useSelector";

/**
 * @param endpoint TMDB API endpoint to fetch movies from.
 */
const useMovies = (
  endpoint: string,
  initialPage?: number
): [
  Tmdb.MovieResult[],
  (page: number) => void,
  number,
  number | null,
  boolean | null,
  string | null
] => {
  const [currentPage, setCurrentPage] = useState(initialPage ?? 1);
  const [previousPage, setPreviousPage] = useState(-1);
  const results = useSelector(state => state.movies[endpoint]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPage = (page: number) => {
      dispatch(fetchMovies(endpoint, page));
      setPreviousPage(currentPage);
    };
    if (previousPage !== currentPage) {
      if (results) {
        const { pages, isFetching } = results;
        if (!isFetching && !pages[currentPage]) {
          fetchPage(currentPage);
        }
      } else {
        fetchPage(currentPage);
      }
    }
  }, [results, currentPage, previousPage, setPreviousPage, dispatch, endpoint]);
  if (results) {
    const { pages, isFetching, totalPages, error } = results;
    const setPage = (page: number) => {
      if (page > 0 && totalPages && page <= totalPages) {
        setCurrentPage(page);
      }
    };
    return [
      pages[currentPage] ?? [],
      setPage,
      currentPage,
      totalPages,
      isFetching,
      error
    ];
  } else {
    return [[], (_: number) => {}, currentPage, null, null, null];
  }
};

export default useMovies;
