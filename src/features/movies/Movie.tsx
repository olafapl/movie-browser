import React from "react";
import { useParams } from "react-router-dom";
import { Flex, Spinner, Box, Text } from "@chakra-ui/core";
import useMovie from "features/movies/useMovie";
import Head from "components/Head";

const Movie = () => {
  const { id } = useParams();
  const [movie, isFetching, error] = useMovie(Number.parseInt(id!));
  return movie ? (
    <Box p="4">
      <Head title={movie.title} />
      <Text>{movie.title}</Text>
    </Box>
  ) : (
    <Flex alignItems="center" justifyContent="center" flex="1">
      {isFetching ? <Spinner /> : error && <Text>An error occurred.</Text>}
    </Flex>
  );
};

export default Movie;
