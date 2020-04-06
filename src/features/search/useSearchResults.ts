import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setPage as setP } from "features/search/searchSlice";
import useSelector from "hooks/useSelector";

/**
 * @param endpoint TMDB API endpoint to fetch movies from.
 */
const useSearchResults = (): [
  Tmdb.MovieResult[] | null,
  number,
  (page: number) => void,
  number | null,
  boolean,
  string | null
] => {
  const { results, page, totalPages, error, isFetching } = useSelector(
    state => state.search
  );
  const dispatch = useDispatch();
  const setPage = useCallback(
    (page: number) => {
      dispatch(setP(page));
    },
    [dispatch]
  );

  return [
    results ?? null,
    page,
    setPage,
    totalPages ?? null,
    isFetching,
    error
  ];
};

export default useSearchResults;
