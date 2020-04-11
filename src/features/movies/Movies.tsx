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
    <Container sx={{ flex: 1 }}>
      <Head title={title} />
      <Text as="h1" variant="heading" mb="4">
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
  );
};

export default Movies;
