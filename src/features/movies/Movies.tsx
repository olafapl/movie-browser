import React, { useCallback, useState, useEffect } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";
import {
  Flex,
  Spinner,
  Heading,
  Box,
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
  const [page, setPage] = useState(1);
  const [movies, totalPages, isFetching, error] = useMovies(endpoint, page);

  useEffect(() => {
    const pageQueryParamValue = Number.parseInt(
      (pageQueryParam as unknown) as string
    );
    if (Number.isNaN(pageQueryParamValue)) {
      setPage(1);
    } else if (pageQueryParamValue !== page) {
      setPage(pageQueryParamValue);
    }
  }, [endpoint, page, setPage, pageQueryParam]);

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

  return movies?.length ? (
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
            pos="relative"
            height="100%"
            width="100%"
            borderRadius="md"
            overflow="hidden"
            _hover={{ textDecor: "none" }}
          >
            <PseudoBox
              role="group"
              height="100%"
              width="100%"
              boxShadow="md"
              transition="opacity 0.2s ease-in-out"
              _hover={{ opacity: 0.8 }}
            >
              {movie.poster_path ? (
                <TmdbImage
                  path={movie.poster_path}
                  imageType="poster"
                  sizes="(max-width: 30em) 50vw, (max-width: 48em) 25vw, 20vw"
                  css={css`
                    width: 100%;
                  `}
                />
              ) : (
                <Box
                  height="100%"
                  width="100%"
                  backgroundColor="gray.700"
                ></Box>
              )}
              <PseudoBox
                pos="absolute"
                transform="translatey(1rem)"
                right="0"
                bottom="0"
                left="0"
                p="2"
                pt="4"
                backgroundImage="linear-gradient(to top, #000, transparent)"
                opacity={0}
                transition="transform 0.2s ease-in-out, opacity 0.2s ease-in-out"
                _groupHover={{ transform: "translatey(0)", opacity: 1 }}
              >
                <Text fontWeight="bold" isTruncated>
                  {movie.title}
                </Text>
              </PseudoBox>
            </PseudoBox>
          </Link>
        ))}
      </Grid>
      <Flex justifyContent="center">
        <Stack isInline spacing="2">
          {totalPages && page > 1 && (
            <Button
              variant="ghost"
              isDisabled={!!isFetching}
              onClick={() => goToPage(page - 1)}
              leftIcon="arrow-back"
            >
              Previous
            </Button>
          )}
          {totalPages && page < totalPages && (
            <Button
              variant="ghost"
              isDisabled={!!isFetching}
              onClick={() => goToPage(page + 1)}
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
      {isFetching ? <Spinner /> : error && <Text>An error occurred.</Text>}
    </Flex>
  );
};

export default Movies;
