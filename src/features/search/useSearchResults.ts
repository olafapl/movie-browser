import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchResults, dropResults } from "features/search/searchSlice";
import useSelector from "hooks/useSelector";
import useQueryParam from "hooks/useQueryParam";

const useSearchResults = (): [
  Tmdb.MovieResult[] | null,
  number,
  (page: number) => void,
  number | null,
  boolean,
  string | null
] => {
  const { pages, totalPages, error, isFetching } = useSelector(
    state => state.search
  );
  const dispatch = useDispatch();
  const [queryParam] = useQueryParam("query");
  const query = (queryParam as string) ?? "";
  const [pageParam, setPageParam] = useQueryParam("page");
  const page = Number.parseInt(pageParam as string) || 1;

  const setPage = useCallback(
    (page: number) => {
      setPageParam(page.toString());
    },
    [setPageParam]
  );

  useEffect(() => {
    setPage(1);
  }, [query, setPage]);

  useEffect(() => {
    if (query) {
      dispatch(fetchResults(query, page));
    } else {
      dispatch(dropResults());
    }
  }, [query, page, dispatch]);

  return [
    pages[page] ?? null,
    page,
    setPage,
    totalPages ?? null,
    isFetching,
    error
  ];
};

export default useSearchResults;
