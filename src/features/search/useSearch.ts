import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useQueryParams, StringParam, NumberParam } from "use-query-params";
import { fetchResults } from "features/search/searchSlice";
import useSelector from "hooks/useSelector";

const useSearch = (): [
  Tmdb.MovieResult[] | null,
  string,
  (query: string) => void,
  number,
  (page: number) => void,
  number | null,
  boolean | null,
  string | null
] => {
  const queries = useSelector((state) => state.search.queries);
  const dispatch = useDispatch();
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
      setQueryParams({ page }, "pushIn");
    },
    [setQueryParams]
  );

  useEffect(() => {
    const pages = queries[query]?.pages;
    if (
      query &&
      (!pages ||
        !(page in pages) ||
        (!pages[page].isFetching && !pages[page].data))
    ) {
      dispatch(fetchResults({ query, page }));
    }
  }, [query, page, queries, dispatch]);

  return [
    queries?.[query]?.pages[page]?.data ?? null,
    query,
    setQuery,
    page,
    setPage,
    queries?.[query]?.totalPages ?? null,
    queries?.[query]?.pages[page]?.isFetching ?? null,
    queries?.[query]?.pages[page]?.error ?? null,
  ];
};

export default useSearch;
