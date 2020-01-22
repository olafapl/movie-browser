import React, { useCallback } from "react";
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
import useMovies from "features/movies/useMovies";
import TmdbImage from "components/TmdbImage";
import useQueryParam from "hooks/useQueryParam";

interface MoviesProps {
  title: string;
  endpoint: string;
}

const Movies: React.FC<MoviesProps> = ({ title, endpoint }) => {
  const [pageQueryParam, setPageQueryParam] = useQueryParam("page");
  const page = Number.parseInt((pageQueryParam as unknown) as string);
  const [
    movies,
    setPage,
    currentPage,
    totalPages,
    isFetchingMovies,
    moviesError
  ] = useMovies(endpoint, Number.isNaN(page) ? 1 : page);
  const goToPage = useCallback(
    (page: number) => {
      if (page > 0 && totalPages && page <= totalPages) {
        setPage(page);
        setPageQueryParam(page.toString());
        window.scrollTo(0, 0);
      }
    },
    [setPage, totalPages, setPageQueryParam]
  );
  return movies.length ? (
    <Stack spacing="4" p="4" mt="4">
      <Heading as="h1">{title}</Heading>
      <Grid
        gridTemplateColumns={[
          "repeat(2, 1fr)",
          "repeat(4, 1fr)",
          "repeat(5, 1fr)"
        ]}
        gap="4"
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
                  imageType="poster"
                  sizes="(max-width: 30em) 50vw, (max-width: 48em) 25vw, 20vw"
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
      <Flex justifyContent="center">
        <Stack isInline spacing="2">
          {totalPages && currentPage > 1 && (
            <Button
              variant="ghost"
              isDisabled={!!isFetchingMovies}
              onClick={() => goToPage(currentPage - 1)}
              leftIcon="arrow-back"
            >
              Previous
            </Button>
          )}
          {totalPages && currentPage < totalPages && (
            <Button
              variant="ghost"
              isDisabled={!!isFetchingMovies}
              onClick={() => goToPage(currentPage + 1)}
              rightIcon="arrow-forward"
            >
              Next
            </Button>
          )}
        </Stack>
      </Flex>
    </Stack>
  ) : (
    <Flex alignItems="center" justifyContent="center" flex="1">
      {isFetchingMovies ? (
        <Spinner />
      ) : (
        moviesError && <Text>An error occurred.</Text>
      )}
    </Flex>
  );
};

export default Movies;
