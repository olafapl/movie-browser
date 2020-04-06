import React, { useCallback, useEffect } from "react";
/** @jsx jsx */
import { jsx, Text, Container } from "theme-ui";
import useMovies from "features/movies/useMovies";
import MovieGrid from "features/movies/MovieGrid";
import useQueryParam from "hooks/useQueryParam";

interface MoviesProps {
  title: string;
  endpoint: string;
}

const Movies = ({ title, endpoint }: MoviesProps) => {
  const [pageQueryParam, setPageQueryParam] = useQueryParam("page");
  const [movies, page, setPage, totalPages, isFetching, error] = useMovies(
    endpoint
  );

  useEffect(() => {
    const pageQueryParamValue = Number.parseInt(
      (pageQueryParam as unknown) as string
    );
    if (Number.isNaN(pageQueryParamValue)) {
      setPage(1);
    } else if (pageQueryParamValue !== page) {
      setPage(pageQueryParamValue);
    }
  }, [endpoint, page, setPage, pageQueryParam]);

  const goToPage = useCallback(
    (page: number) => {
      if (page > 0 && totalPages && page <= totalPages) {
        setPage(page);
        setPageQueryParam(page.toString());
        window.scrollTo(0, 0);
      }
    },
    [setPage, totalPages, setPageQueryParam]
  );

  return (
    <Container sx={{ flex: "1" }}>
      <Text as="h1" sx={{ variant: "text.heading", mb: 4 }}>
        {title}
      </Text>
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

export default Movies;
