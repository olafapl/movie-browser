import React from "react";
import useSearch from "features/search/useSearch";
import SearchContext from "features/search/SearchContext";

const SearchProvider: React.FC = ({ children }) => {
  const [
    movies,
    query,
    setQuery,
    page,
    setPage,
    totalPages,
    isFetching,
    error
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
        isFetching,
        error
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
