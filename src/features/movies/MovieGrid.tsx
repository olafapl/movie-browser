import React from "react";
import css from "@emotion/css/macro";
import { Flex, Box, Grid, Button, Link, Text, Spinner } from "theme-ui";
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

const MovieGrid = ({
  movies,
  page,
  setPage,
  showPreviousButton,
  showNextButton,
  isLoading,
  error
}: MovieGridProps) => {
  return (
    <React.Fragment>
      {movies?.length ? (
        <React.Fragment>
          <Grid columns={[2, 4, 5]} gap="3" sx={{ alignItems: "center" }}>
            {movies.map(movie => (
              <Link
                as={RouterLink}
                // @ts-ignore
                to={`/movie/${movie.id}`}
                key={movie.id}
                sx={{
                  position: "relative",
                  height: movie.poster_path ? "unset" : "100%",
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: 1,
                  color: "white",
                  transition: "opacity 0.2s ease-in-out",
                  ":hover, :focus": {
                    opacity: 0.8,
                    textDecoration: "none",
                    color: "white",
                    ".title": {
                      transform: "translatey(0)",
                      opacity: 1
                    }
                  }
                }}
              >
                <Flex
                  sx={{
                    height: "100%",
                    width: "100%"
                  }}
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
                    <Box sx={{ height: "100%", width: "100%" }}></Box>
                  )}

                  {/* TODO truncate text */}
                  <Text
                    className="title"
                    variant="truncated"
                    sx={{
                      position: "absolute",
                      transform: "translatey(1rem)",
                      right: 0,
                      bottom: 0,
                      left: 0,
                      p: 2,
                      pt: 3,
                      backgroundImage:
                        "linear-gradient(to top, #000, transparent)",
                      fontWeight: "bold",
                      opacity: 0,
                      transition:
                        "transform 0.2s ease-in-out, opacity 0.2s ease-in-out"
                    }}
                  >
                    {movie.title}
                  </Text>
                </Flex>
              </Link>
            ))}
          </Grid>
          {(showPreviousButton || showNextButton) && (
            <Flex
              sx={{ mt: 3, justifyContent: "center", flexDirection: "row" }}
            >
              {showPreviousButton && (
                <Button
                  mx="2"
                  variant="ghost"
                  disabled={isLoading}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
              )}
              {showNextButton && (
                <Button
                  mx="3"
                  variant="ghost"
                  disabled={isLoading}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              )}
            </Flex>
          )}
        </React.Fragment>
      ) : (
        <Flex
          sx={{
            alignItems: "center",
            justifyContent: "center",
            flex: "1"
          }}
        >
          {isLoading ? <Spinner /> : error && <Text>An error occurred.</Text>}
        </Flex>
      )}
    </React.Fragment>
  );
};

export default MovieGrid;
