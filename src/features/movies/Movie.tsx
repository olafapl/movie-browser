import React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useParams } from "react-router-dom";
import {
  Flex,
  Spinner,
  Box,
  Text,
  Link,
  Heading,
  Stack,
  Badge,
  Icon,
  Divider
} from "@chakra-ui/core";
import css from "@emotion/css/macro";
import useMovie from "features/movies/useMovie";
import Head from "components/Head";
import TmdbImage from "components/TmdbImage";

const Movie = () => {
  const { id } = useParams();
  const [movie, isFetchingMovie, movieError] = useMovie(Number.parseInt(id!));
  return movie ? (
    <React.Fragment>
      <Head title={movie.title} />
      <Box pos="relative">
        <Flex
          pos="relative"
          alignItems="flex-end"
          overflow="hidden"
          zIndex={1}
          p="4"
          py="8"
          backgroundImage="linear-gradient(to top, #1b1b1b, #1b1b1b66)"
        >
          {movie.poster_path && (
            <Box
              borderRadius="md"
              overflow="hidden"
              mr="4"
              flex="1"
              flexShrink={0}
              boxShadow="md"
            >
              <TmdbImage
                path={movie.poster_path}
                imageType="poster"
                sizes="33vw"
              />
            </Box>
          )}
          <Stack spacing="4" flex="2">
            <Heading>{movie.title}</Heading>
            {movie.tagline && <Text fontStyle="italic">{movie.tagline}</Text>}
          </Stack>
        </Flex>
        {movie.backdrop_path && (
          <Box pos="absolute" top="0" right="0" bottom="0" left="0">
            <TmdbImage
              path={movie.backdrop_path}
              imageType="backdrop"
              sizes="100vw"
              css={css`
                object-fit: cover;
                object-position: 50%;
                width: 100%;
                height: 100%;
              `}
            />
          </Box>
        )}
      </Box>
      <Stack px="4" pb="4" spacing="4">
        <Stack spacing="2">
          <Stack isInline spacing="4" color="whiteAlpha.700">
            <Text as="time" title="Release year">
              {new Date(movie.release_date).getFullYear()}
            </Text>
            {movie.runtime > 0 && (
              <Text title="Runtime">{`${Math.floor(
                movie.runtime / 60
              )} h ${movie.runtime % 60} min`}</Text>
            )}
          </Stack>
          {movie.genres.length && (
            <Stack
              isInline
              alignItems="center"
              spacing="2"
              my={-1}
              flexWrap="wrap"
            >
              {movie.genres.map(genre => (
                <Badge key={genre.id} my="1">
                  {genre.name}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
        <Text>{movie.overview}</Text>
        {movie.imdb_id && (
          <>
            <Divider my="0" mb="4" />
            <Link
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              isExternal
              alignSelf="center"
            >
              Open on IMDb <Icon name="external-link" ml="1" />
            </Link>
          </>
        )}
      </Stack>
    </React.Fragment>
  ) : (
    <Flex alignItems="center" justifyContent="center" flex="1">
      {isFetchingMovie ? (
        <Spinner />
      ) : (
        movieError && <Text>An error occurred.</Text>
      )}
    </Flex>
  );
};

export default Movie;
