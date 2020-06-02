// eslint-disable-next-line
import React, { useContext } from "react";
/** @jsx jsx */
import { jsx, Text, Container } from "theme-ui";
import MovieGrid from "movies/MovieGrid";
import SearchContext from "search/SearchContext";
import Head from "common/Head";

const SearchResults = () => {
  const {
    movies,
    query,
    page,
    setPage,
    totalPages,
    status,
    error,
  } = useContext(SearchContext);
  return (
    <Container sx={{ flex: 1 }}>
      <Head title={`Search: ${query}`} />
      <Text as="h1" variant="heading" mb="4">
        Results for "{query}"
      </Text>
      <MovieGrid
        movies={movies}
        page={page}
        setPage={setPage}
        showPreviousButton={page > 1}
        showNextButton={totalPages !== undefined && page < totalPages}
        isLoading={status === "loading"}
        error={error}
      />
    </Container>
  );
};

export default SearchResults;
