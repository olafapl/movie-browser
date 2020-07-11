/** @jsx jsx */
import { jsx, Text, Container } from "theme-ui";
import { Helmet } from "react-helmet";
import MovieGrid from "movies/MovieGrid";
import useSearch from "search/useSearch";

const SearchResults = () => {
  const {
    results,
    query,
    page,
    setPage,
    totalPages,
    status,
    error,
  } = useSearch();
  return (
    <Container sx={{ flex: 1 }}>
      <Helmet>
        <title>{`Search: ${query}`}</title>
      </Helmet>
      <Text as="h1" variant="heading" mb="4">
        Results for "{query}"
      </Text>
      <MovieGrid
        movies={results}
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
