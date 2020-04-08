import { useEffect, useCallback, useState } from "react";
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
  const [argDate, setArgDate] = useState(new Date().getTime());
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
  const queryState = useSelector((state) => state.search.queries[query]);
  const dispatch = useDispatch();

  useEffect(() => {
    setArgDate(new Date().getTime());
  }, [query, page]);

  useEffect(() => {
    const pages = queryState?.pages;
    if (
      query &&
      !pages?.[page]?.isFetching &&
      !pages?.[page]?.data &&
      (!pages?.[page]?.fetchDate || pages[page].fetchDate! < argDate)
    ) {
      dispatch(fetchResults({ query, page }));
    }
  }, [query, page, argDate, queryState, dispatch]);

  return [
    queryState?.pages[page]?.data ?? null,
    query,
    setQuery,
    page,
    setPage,
    queryState?.totalPages ?? null,
    queryState?.pages[page]?.isFetching ?? null,
    queryState?.pages[page]?.error ?? null,
  ];
};

export default useSearch;
