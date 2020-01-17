import React from "react";
import Loading from "components/loading";
import { Container } from "components/layout";
import useTmdbConfig from "features/movies/useTmdbConfig";
import useTrendingMovies from "features/movies/useTrendingMovies";

const Movies = () => {
  const [tmdbConfig, isFetchingTmdbConfig] = useTmdbConfig();
  const [
    trendingMovies,
    fetchNextPage,
    isFetchingTrendingMovies
  ] = useTrendingMovies();
  const isLoaded = !isFetchingTrendingMovies && trendingMovies.length;
  return isLoaded ? (
    <button onClick={() => fetchNextPage()}>Load some more movies!</button>
  ) : (
    <Container centered>
      <Loading />
    </Container>
  );
};

export default Movies;
