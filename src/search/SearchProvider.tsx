import React, { createContext, useCallback } from "react";
import { useQueryParam, StringParam } from "use-query-params";

export interface SearchContextState {
  query: string;
  setQuery: (query: string) => void;
}

const initialState: SearchContextState = {
  query: "",
  setQuery: () => {},
};

export const SearchContext = createContext(initialState);

interface SearchProviderProps {
  children?: React.ReactNode;
}

const SearchProvider = ({ children }: SearchProviderProps) => {
  const [queryParam, setQueryParam] = useQueryParam("query", StringParam);
  const query = queryParam ?? "";
  const setQuery = useCallback(
    (query: string) => {
      setQueryParam(query);
    },
    [setQueryParam]
  );

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
