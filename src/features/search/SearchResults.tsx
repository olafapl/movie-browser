import React, { useCallback } from "react";
import { Container } from "theme-ui";
import useSearchResults from "features/search/useSearchResults";
import MovieGrid from "features/movies/MovieGrid";

const SearchResults = () => {
  const [
    movies,
    page,
    setPage,
    totalPages,
    isFetching,
    error
  ] = useSearchResults();

  const goToPage = useCallback(
    (page: number) => {
      if (page > 0 && totalPages && page <= totalPages) {
        setPage(page);
        window.scrollTo(0, 0);
      }
    },
    [setPage, totalPages]
  );

  return (
    <Container sx={{ flex: "1" }}>
      <MovieGrid
        movies={movies}
        page={page}
        setPage={goToPage}
        showPreviousButton={page > 1}
        showNextButton={totalPages !== null && page < totalPages}
        isLoading={!!isFetching}
        error={error}
      />
    </Container>
  );
};

export default SearchResults;
