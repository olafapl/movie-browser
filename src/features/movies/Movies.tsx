import React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";
import {
  Flex,
  Spinner,
  Heading,
  Grid,
  Stack,
  Button,
  PseudoBox,
  Link,
  Text
} from "@chakra-ui/core";
import { Link as RouterLink } from "react-router-dom";
import useTmdbConfig from "features/movies/useTmdbConfig";
import useMovies from "features/movies/useMovies";
import TmdbImage from "components/TmdbImage";

interface MoviesProps {
  title: string;
  endpoint: string;
}

const Movies: React.FC<MoviesProps> = ({ title, endpoint }) => {
  const [tmdbConfig, isFetchingTmdbConfig, tmdbConfigError] = useTmdbConfig();
  const [
    movies,
    fetchNextPage,
    hasNextPage,
    isFetchingMovies,
    moviesError
  ] = useMovies(endpoint);
  return movies.length && tmdbConfig ? (
    <Stack spacing="4" p="4" mt="4">
      <Heading as="h1">{title}</Heading>
      <Grid
        gridTemplateColumns={[
          "repeat(auto-fit, minmax(100px, 1fr))",
          "repeat(auto-fit, minmax(200px, 1fr))"
        ]}
        gap={[2, 4]}
        alignItems="flex-start"
      >
        {movies.map(movie => (
          <Link
            // @ts-ignore
            as={RouterLink}
            to={`/movie/${movie.id}`}
            key={movie.id}
            borderRadius="md"
            overflow="hidden"
            _hover={{ textDecor: "none" }}
          >
            <PseudoBox
              role="group"
              pos="relative"
              boxShadow="md"
              transition="opacity 0.2s ease-in-out"
              _hover={{ opacity: 0.8 }}
            >
              {movie.poster_path && (
                <TmdbImage
                  path={movie.poster_path}
                  tmdbConfig={tmdbConfig}
                  imageType="poster"
                  sizes="(max-width: 30em) 150px, 300px"
                  css={css`
                    width: 100%;
                  `}
                />
              )}
              <PseudoBox
                transform="translatey(1rem)"
                opacity={0}
                transition="transform 0.2s ease-in-out, opacity 0.2s ease-in-out"
                _groupHover={{ transform: "translatey(0)", opacity: 1 }}
              >
                <Text
                  pos="absolute"
                  fontWeight="bold"
                  right="0"
                  bottom="0"
                  left="0"
                  p="2"
                  pt="4"
                  backgroundImage="linear-gradient(to top, #000, transparent)"
                  isTruncated
                >
                  {movie.title}
                </Text>
              </PseudoBox>
            </PseudoBox>
          </Link>
        ))}
      </Grid>
      {hasNextPage && (
        <Flex justifyContent="center">
          <Button
            variant="ghost"
            isLoading={!!isFetchingMovies}
            onClick={() => fetchNextPage()}
          >
            Load more
          </Button>
        </Flex>
      )}
    </Stack>
  ) : (
    <Flex alignItems="center" justifyContent="center" flex="1">
      {isFetchingMovies || isFetchingTmdbConfig ? (
        <Spinner />
      ) : (
        (moviesError || tmdbConfigError) && <Text>An error occurred.</Text>
      )}
    </Flex>
  );
};

export default Movies;
