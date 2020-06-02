import React from "react";
import useSearch from "search/useSearch";
import SearchContext from "search/SearchContext";

interface SearchProviderProps {
  children?: React.ReactNode;
}

const SearchProvider = ({ children }: SearchProviderProps) => {
  const [
    movies,
    query,
    setQuery,
    page,
    setPage,
    totalPages,
    status,
    error,
  ] = useSearch();
  return (
    <SearchContext.Provider
      value={{
        movies,
        query,
        setQuery,
        page,
        setPage,
        totalPages,
        status,
        error,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
