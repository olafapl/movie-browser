import React, { useCallback } from "react";
/** @jsx jsx */
import { jsx, Text, Container } from "theme-ui";
import { useQuery } from "react-query";
import { useQueryParam, NumberParam } from "use-query-params";
import { fetchMovies } from "movies/api";
import MovieGrid from "movies/MovieGrid";
import Head from "common/Head";

interface MoviesProps {
  title: string;
  endpoint: string;
}

const Movies = ({ title, endpoint }: MoviesProps) => {
  const [pageParam, setPageParam] = useQueryParam("page", NumberParam);
  const page = pageParam ?? 1;
  const setPage = useCallback(
    (page: number) => {
      setPageParam(page);
    },
    [setPageParam]
  );
  const { status, data, error } = useQuery(["movies", endpoint, page], () =>
    fetchMovies(endpoint, page)
  );

  return (
    <Container sx={{ flex: 1 }}>
      <Head title={title} />
      <Text as="h1" variant="heading" mb="4">
        {title}
      </Text>
      <MovieGrid
        movies={data?.results}
        page={page}
        setPage={setPage}
        showPreviousButton={page > 1}
        showNextButton={
          data?.total_pages !== undefined && page < data.total_pages
        }
        isLoading={status === "loading"}
        error={error?.message}
      />
    </Container>
  );
};

export default Movies;
