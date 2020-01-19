/** @jsx jsx */
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";
import {
  Flex,
  Spinner,
  Heading,
  Grid,
  Stack,
  PseudoBox,
  Link
} from "@chakra-ui/core";
import { Link as RouterLink } from "react-router-dom";
import useTmdbConfig from "features/movies/useTmdbConfig";
import useMovies from "features/movies/useMovies";
import TmdbImage from "components/TmdbImage";

const Movies = () => {
  const [tmdbConfig, isFetchingTmdbConfig] = useTmdbConfig();
  const [movies, fetchNextPage, isFetchingMovies, moviesError] = useMovies(
    "trending/movie/day"
  );
  const isLoaded =
    !isFetchingMovies && movies.length && !isFetchingTmdbConfig && tmdbConfig;
  return isLoaded ? (
    <Stack spacing="4" p="4">
      <Heading as="h1">Trending movies</Heading>
      <Grid
        gridTemplateColumns={[
          "1fr 1fr",
          "repeat(auto-fit, minmax(200px, 1fr))"
        ]}
        gap="4"
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
                sizes="(max-width: 30em) 50vw, 300px"
                css={css`
                  width: 100%;
                `}
              />
            </PseudoBox>
          </Link>
        ))}
      </Grid>
    </Stack>
  ) : (
    <Flex alignItems="center" justifyContent="center" flex="1">
      <Spinner />
    </Flex>
  );
};

export default Movies;
