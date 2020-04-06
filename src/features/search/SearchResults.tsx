import React, { useContext } from "react";
import { Container, Text } from "theme-ui";
import MovieGrid from "features/movies/MovieGrid";
import SearchContext from "features/search/SearchContext";

const SearchResults = () => {
  const {
    movies,
    query,
    page,
    setPage,
    totalPages,
    isFetching,
    error,
  } = useContext(SearchContext);
  return (
    <Container sx={{ flex: "1" }}>
      <Text as="h1" sx={{ variant: "text.heading", mb: 4 }}>
        Results for "{query}"
      </Text>
      <MovieGrid
        movies={movies}
        page={page}
        setPage={setPage}
        showPreviousButton={page > 1}
        showNextButton={totalPages !== null && page < totalPages}
        isLoading={!!isFetching}
        error={error}
      />
    </Container>
  );
};

export default SearchResults;
