import React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";
import {
  Flex,
  Spinner,
  Box,
  Grid,
  Stack,
  Button,
  PseudoBox,
  Link,
  Text
} from "@chakra-ui/core";
import { Link as RouterLink } from "react-router-dom";
import TmdbImage from "components/TmdbImage";

interface MovieGridProps {
  movies: Tmdb.MovieResult[] | null;
  page: number;
  setPage: (page: number) => void;
  showPreviousButton: boolean;
  showNextButton: boolean;
  isLoading: boolean;
  error: string | null;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  page,
  setPage,
  showPreviousButton,
  showNextButton,
  isLoading,
  error
}) => {
  return (
    <React.Fragment>
      {movies?.length ? (
        <React.Fragment>
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
                height={movie.poster_path ? "unset" : "100%"}
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
          {(showPreviousButton || showNextButton) && (
            <Flex justifyContent="center" mt="4">
              <Stack isInline spacing="2">
                {showPreviousButton && (
                  <Button
                    variant="ghost"
                    isDisabled={isLoading}
                    onClick={() => setPage(page - 1)}
                    leftIcon="arrow-back"
                  >
                    Previous
                  </Button>
                )}
                {showNextButton && (
                  <Button
                    variant="ghost"
                    isDisabled={isLoading}
                    onClick={() => setPage(page + 1)}
                    rightIcon="arrow-forward"
                  >
                    Next
                  </Button>
                )}
              </Stack>
            </Flex>
          )}
        </React.Fragment>
      ) : (
        <Flex alignItems="center" justifyContent="center" flex="1">
          {isLoading ? <Spinner /> : error && <Text>An error occurred.</Text>}
        </Flex>
      )}
    </React.Fragment>
  );
};

export default MovieGrid;
