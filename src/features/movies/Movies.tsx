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

const Movies = () => {
  const [tmdbConfig, isFetchingTmdbConfig, tmdbConfigError] = useTmdbConfig();
  const [movies, fetchNextPage, isFetchingMovies, moviesError] = useMovies(
    "trending/movie/day"
  );
  return movies.length && tmdbConfig ? (
    <Stack spacing="4" px={[2, 4]} py="4">
      <Heading as="h1">Trending movies</Heading>
      <Grid
        gridTemplateColumns={[
          "1fr 1fr 1fr",
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
          >
            <PseudoBox
              pos="relative"
              boxShadow="md"
              transition="opacity 0.2s ease-in-out"
              _hover={{ opacity: 0.8 }}
            >
              <TmdbImage
                path={movie.poster_path!}
                tmdbConfig={tmdbConfig!}
                imageType="poster"
                sizes="(max-width: 30em) 33vw, 300px"
                css={css`
                  width: 100%;
                `}
              />
            </PseudoBox>
          </Link>
        ))}
      </Grid>
      <Flex justifyContent="center">
        <Button
          variant="ghost"
          isLoading={!!isFetchingMovies}
          onClick={() => fetchNextPage()}
        >
          Load more
        </Button>
      </Flex>
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
