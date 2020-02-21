import React from "react";
import { useParams } from "react-router-dom";
/** @jsx jsx */
import { jsx, Flex, Box, Text, Badge, Spinner, Container } from "theme-ui";
import { alpha } from "@theme-ui/color";
import useMovie from "features/movies/useMovie";
import Head from "components/Head";
import TmdbImage from "components/TmdbImage";

const Movie = () => {
  const { id } = useParams();
  const [movie, isFetching, error] = useMovie(Number.parseInt(id!));
  return movie ? (
    <React.Fragment>
      <Head title={movie.title} />
      <Box sx={{ position: "relative" }}>
        <Container>
          <Box
            sx={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gridTemplateRows: "min-content",
              gridTemplateAreas: [
                "'poster title' 'meta meta' 'overview overview'",
                "'poster title' 'poster meta' 'poster overview'"
              ],
              columnGap: [3, 4],
              rowGap: 3,
              alignItems: "end",
              overflow: "hidden",
              zIndex: 1
            }}
          >
            {movie.poster_path && (
              <Flex
                sx={{
                  gridArea: "poster",
                  overflow: "hidden",
                  borderRadius: 1
                }}
              >
                <TmdbImage
                  path={movie.poster_path}
                  imageType="poster"
                  sizes="33vw"
                />
              </Flex>
            )}
            <Flex sx={{ gridArea: "title", flexDirection: "column" }}>
              <Text as="h1" variant="heading">
                {movie.title}
              </Text>
              {movie.tagline && (
                <Text sx={{ fontStyle: "italic", mt: 3 }}>{movie.tagline}</Text>
              )}
            </Flex>
            <Box sx={{ gridArea: "meta", display: "grid", gap: 2 }}>
              <Flex sx={{ flexDirection: "row" }}>
                <Text as="time" title="Release year">
                  {new Date(movie.release_date).getFullYear()}
                </Text>
                {movie.runtime > 0 && (
                  <Text title="Runtime" ml="3">{`${Math.floor(
                    movie.runtime / 60
                  )} h ${movie.runtime % 60} min`}</Text>
                )}
              </Flex>
              {movie.genres.length > 0 && (
                <Flex sx={{ alignItems: "center", flexWrap: "wrap", m: -1 }}>
                  {movie.genres.map(genre => (
                    <Badge key={genre.id} m="1" variant="plain">
                      {genre.name}
                    </Badge>
                  ))}
                </Flex>
              )}
            </Box>
            <Text sx={{ gridArea: "overview" }}>{movie.overview}</Text>
            {/*             {movie.imdb_id && (
              <Link
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                sx={{
                  gridColumn: "span 2",
                  justifySelf: "center"
                }}
              >
                Open on IMDb
              </Link>
            )} */}
          </Box>
        </Container>
        {movie.backdrop_path && (
          <Box
            sx={{
              position: "absolute",
              overflow: "hidden",
              maxHeight: "100%",
              top: 0,
              right: 0,
              left: 0,
              ":after": {
                content: `""`,
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: alpha("background", 0.33),
                backgroundImage: theme =>
                  `linear-gradient(to top, ${theme.colors.background}, transparent)`
              }
            }}
          >
            <TmdbImage
              path={movie.backdrop_path}
              imageType="backdrop"
              sizes="100vw"
              sx={{
                objectFit: "cover",
                objectPosition: "50%",
                width: "100%",
                height: "100%"
              }}
            />
          </Box>
        )}
      </Box>
    </React.Fragment>
  ) : (
    <Flex
      sx={{
        alignItems: "center",
        justifyContent: "center",
        flex: "1"
      }}
    >
      <Container
        sx={{ alignItems: "center", justifyContent: "center", flex: "1" }}
      >
        {isFetching ? <Spinner /> : error && <Text>An error occurred.</Text>}
      </Container>
    </Flex>
  );
};

export default Movie;
