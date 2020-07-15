import { useInfiniteQuery } from "react-query";
import { QueryParam, fetchPaginated } from "common/api";

/**
 * Hook that enables infinite scrolling / "load more" functionality for
 * paginated data from a TMDb API endpoint.
 * @param endpoint TMDb API endpoint to fetch data from.
 * @param queryParams Additional query params to append to the request. Page
 * numbers are handled internally by this hook.
 */
const usePaginated = <T>(endpoint: string, queryParams: QueryParam[] = []) => {
  const queryInfo = useInfiniteQuery(
    [endpoint, queryParams],
    (e, q, page: number = 1) => fetchPaginated<T>(e, page, q),
    {
      getFetchMore: ({ page, total_pages }) => {
        if (page + 1 > total_pages) {
          return false;
        }
        return page + 1;
      },
    }
  );
  return queryInfo;
};

export default usePaginated;
