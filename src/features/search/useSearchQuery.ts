import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useDebounce } from "use-lodash-debounce";
import { fetchResults, setQuery as setQ } from "features/search/searchSlice";
import useSelector from "hooks/useSelector";

const useSearchQuery = (): [string, (query: string) => void] => {
  const { query, page } = useSelector(state => state.search);
  const dispatch = useDispatch();
  const setQuery = useCallback(
    (query: string) => {
      dispatch(setQ(query));
    },
    [dispatch]
  );

  const debouncedQuery = useDebounce(query, 500);
  useEffect(() => {
    if (debouncedQuery) {
      dispatch(fetchResults());
    }
  }, [debouncedQuery, page, dispatch]);

  return [query, setQuery];
};

export default useSearchQuery;
