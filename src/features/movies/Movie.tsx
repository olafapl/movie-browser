import React from "react";
import { useParams } from "react-router-dom";
import { Flex, Spinner, Box } from "@chakra-ui/core";
import useMovie from "features/movies/useMovie";
import Head from "components/Head";

const Movie = () => {
  const { id } = useParams();
  const [movie, isFetching, error] = useMovie(Number.parseInt(id!));
  return isFetching ? (
    <Flex alignItems="center" justifyContent="center" flex="1">
      <Spinner />
    </Flex>
  ) : error ? (
    <Box p="4">
      <p>Could not find the requested movie.</p>
    </Box>
  ) : (
    movie && (
      <Box p="4">
        <Head title={movie.title} />
        <p>{movie.title}</p>
      </Box>
    )
  );
};

export default Movie;
