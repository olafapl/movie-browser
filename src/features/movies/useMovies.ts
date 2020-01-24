import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies } from "features/movies/moviesSlice";
import useSelector from "hooks/useSelector";

/**
 * @param endpoint TMDB API endpoint to fetch movies from.
 */
const useMovies = (
  endpoint: string,
  page: number
): [
  Tmdb.MovieResult[] | null,
  number | null,
  boolean | null,
  string | null
] => {
  const [previousFetchedPage, setPreviousFetchedPage] = useState(-1);
  const results = useSelector(state => state.movies[endpoint]);
  const dispatch = useDispatch();

  useEffect(() => {
    setPreviousFetchedPage(-1);
  }, [endpoint, setPreviousFetchedPage]);

  useEffect(() => {
    const fetchPage = (page: number) => {
      dispatch(fetchMovies(endpoint, page));
      setPreviousFetchedPage(page);
    };
    if (
      previousFetchedPage !== page &&
      (!results || (!results.isFetching && !results.pages[page]))
    ) {
      fetchPage(page);
    }
  }, [
    endpoint,
    page,
    previousFetchedPage,
    setPreviousFetchedPage,
    results,
    dispatch
  ]);

  if (results) {
    const { pages, isFetching, totalPages, error } = results;
    return [pages[page] ?? [], totalPages, isFetching, error];
  } else {
    return [null, null, null, null];
  }
};

export default useMovies;
