import React, { createContext, useCallback } from "react";
import { useQuery, QueryStatus } from "react-query";
import { useQueryParams, StringParam, NumberParam } from "use-query-params";
import { useRouteMatch } from "react-router-dom";
import { MovieListResult } from "movies/api";
import { searchMovies } from "search/api";

export interface SearchContextState {
  results?: MovieListResult[];
  query: string;
  setQuery: (query: string) => void;
  page: number;
  setPage: (page: number) => void;
  totalPages?: number;
  status: QueryStatus;
  error?: string;
}

const initialState: SearchContextState = {
  results: undefined,
  query: "",
  setQuery: () => {},
  page: 1,
  setPage: () => {},
  totalPages: undefined,
  status: "idle",
  error: undefined,
};

export const SearchContext = createContext(initialState);

interface SearchProviderProps {
  children?: React.ReactNode;
}

const SearchProvider = ({ children }: SearchProviderProps) => {
  const isSearchRoute = useRouteMatch("/search");
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
      setQueryParams({ page });
    },
    [setQueryParams]
  );
  const { status, data, error } = useQuery(
    ["search", query, page],
    () => searchMovies(query, page),
    { enabled: isSearchRoute && query.length > 0 }
  );

  return (
    <SearchContext.Provider
      value={{
        results: data?.results,
        query,
        setQuery,
        page,
        setPage,
        totalPages: data?.total_pages,
        status,
        error: error?.message,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
