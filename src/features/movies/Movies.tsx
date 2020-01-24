import React, { useCallback, useState, useEffect } from "react";
import { Heading, Stack } from "@chakra-ui/core";
import useMovies from "features/movies/useMovies";
import MovieGrid from "features/movies/MovieGrid";
import useQueryParam from "hooks/useQueryParam";

interface MoviesProps {
  title: string;
  endpoint: string;
}

const Movies: React.FC<MoviesProps> = ({ title, endpoint }) => {
  const [pageQueryParam, setPageQueryParam] = useQueryParam("page");
  const [page, setPage] = useState(1);
  const [movies, totalPages, isFetching, error] = useMovies(endpoint, page);

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
    <Stack spacing="4" p="4" mt="4" flex="1">
      <Heading as="h1">{title}</Heading>
      <MovieGrid
        movies={movies}
        page={page}
        setPage={goToPage}
        showPreviousButton={page > 1}
        showNextButton={totalPages !== null && page < totalPages}
        isLoading={!!isFetching}
        error={error}
      />
    </Stack>
  );
};

export default Movies;
