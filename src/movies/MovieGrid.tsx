import React from "react";
/** @jsx jsx */
import { jsx, Flex, Grid, Button, Link, Text } from "theme-ui";
import { Link as RouterLink } from "react-router-dom";
import { TmdbImage, Placeholder } from "common/TmdbImage";
import Loading from "common/Loading";
import Error from "common/Error";

interface MovieGridProps {
  page: number;
  setPage: (page: number) => void;
  showPreviousButton: boolean;
  showNextButton: boolean;
  isLoading: boolean;
  movies?: Tmdb.MovieListResult[];
  error?: string;
}

const MovieGrid = ({
  movies,
  page,
  setPage,
  showPreviousButton,
  showNextButton,
  isLoading,
  error,
}: MovieGridProps) => {
  if (movies?.length) {
    return (
      <React.Fragment>
        <Grid columns={[2, 4, 5]} gap="3" sx={{ alignItems: "center" }}>
          {movies.map((movie) => (
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
                opacity: 1,
                transform: "scale(1)",
                transition:
                  "transform 0.2s ease-in-out, opacity 0.2s ease-in-out",
                ":hover, :focus": {
                  opacity: 0.8,
                },
                ":active": {
                  transform: "scale(0.975)",
                },
              }}
            >
              <Flex
                sx={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {movie.poster_path ? (
                  <TmdbImage
                    path={movie.poster_path}
                    imageType="poster"
                    alt={movie.title}
                    sizes="(max-width: 30em) 50vw, (max-width: 48em) 25vw, 20vw"
                  />
                ) : (
                  <React.Fragment>
                    <Placeholder imageType="poster" />
                    <Text
                      sx={{
                        position: "absolute",
                        width: "100%",
                        textAlign: "center",
                        alignSelf: "center",
                        p: 2,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {movie.title}
                    </Text>
                  </React.Fragment>
                )}
              </Flex>
            </Link>
          ))}
        </Grid>
        {(showPreviousButton || showNextButton) && (
          <Flex sx={{ mt: 3, justifyContent: "center", flexDirection: "row" }}>
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
    );
  }
  if (isLoading) {
    return <Loading />;
  }
  return error ? <Error /> : null;
};

export default MovieGrid;
