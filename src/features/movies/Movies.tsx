/** @jsx jsx */
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";
import {
  Flex,
  Spinner,
  AspectRatioBox,
  Text,
  Grid,
  Box,
  Stack
} from "@chakra-ui/core";
import useTmdbConfig from "features/movies/useTmdbConfig";
import useTrendingMovies from "features/movies/useTrendingMovies";
import TmdbImage from "components/TmdbImage";

const Movies = () => {
  const [tmdbConfig, isFetchingTmdbConfig] = useTmdbConfig();
  const [
    trendingMovies,
    fetchNextPage,
    isFetchingTrendingMovies
  ] = useTrendingMovies();
  const isLoaded =
    !isFetchingTrendingMovies &&
    trendingMovies.length &&
    !isFetchingTmdbConfig &&
    tmdbConfig;
  return isLoaded ? (
    <Stack spacing="4" p="4">
      <Text fontSize="2xl" as="h1" fontWeight="bold">
        Trending movies
      </Text>
      <Grid
        gridTemplateColumns={[
          "1fr 1fr",
          "repeat(auto-fit, minmax(200px, 1fr))"
        ]}
        gap="4"
      >
        {trendingMovies.map(movie => (
          <Box
            key={movie.id}
            pos="relative"
            borderRadius="md"
            overflow="hidden"
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
          </Box>
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
