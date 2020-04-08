import React from "react";
/** @jsx jsx */
import { jsx, Text, Container } from "theme-ui";
import useMovies from "features/movies/useMovies";
import MovieGrid from "features/movies/MovieGrid";
import Head from "components/Head";

interface MoviesProps {
  title: string;
  endpoint: string;
}

const Movies = ({ title, endpoint }: MoviesProps) => {
  const [movies, page, setPage, totalPages, isFetching, error] = useMovies(
    endpoint
  );

  return (
    <React.Fragment>
      <Head title={title} />
      <Container sx={{ flex: "1" }}>
        <Text as="h1" sx={{ variant: "text.heading", mb: 4 }}>
          {title}
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
    </React.Fragment>
  );
};

export default Movies;
