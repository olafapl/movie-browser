/** @jsx jsx */
import { jsx, Flex, Box, Text, Badge, Container } from "theme-ui";
import { Helmet } from "react-helmet";
import { alpha } from "@theme-ui/color";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchMovie } from "movies/api";
import { TmdbImage, Placeholder } from "common/TmdbImage";
import Error from "common/Error";
import Loading from "common/Loading";

const Movie = () => {
  const { id } = useParams();
  const movieId = Number.parseInt(id!);
  const { status, data } = useQuery(["movie", movieId], () =>
    fetchMovie(movieId)
  );

  if (status === "success" && data) {
    return (
      <Box sx={{ position: "relative" }}>
        <Helmet>
          <title>{data.title}</title>
        </Helmet>
        <Container>
          <Box
            sx={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gridTemplateRows: "min-content",
              gridTemplateAreas: [
                "'poster title' 'meta meta' 'overview overview'",
                "'poster title' 'poster meta' 'poster overview'",
              ],
              columnGap: [3, 4],
              rowGap: 3,
              alignItems: "end",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            <Flex
              sx={{
                gridArea: "poster",
                overflow: "hidden",
                borderRadius: 1,
              }}
            >
              {data.poster_path ? (
                <TmdbImage
                  path={data.poster_path}
                  imageType="poster"
                  sizes="33vw"
                />
              ) : (
                <Placeholder imageType="poster" />
              )}
            </Flex>
            <Flex sx={{ gridArea: "title", flexDirection: "column" }}>
              <Text as="h1" variant="heading">
                {data.title}
              </Text>
              {data.tagline && (
                <Text sx={{ fontStyle: "italic", mt: 3 }}>{data.tagline}</Text>
              )}
            </Flex>
            <Box sx={{ gridArea: "meta", display: "grid", gap: 2 }}>
              <Flex sx={{ flexDirection: "row" }}>
                <Text as="time" title="Release year">
                  {new Date(data.release_date).getFullYear()}
                </Text>
                {data.runtime > 0 && (
                  <Text title="Runtime" ml="3">{`${Math.floor(
                    data.runtime / 60
                  )} h ${data.runtime % 60} min`}</Text>
                )}
              </Flex>
              {data.genres.length > 0 && (
                <Flex sx={{ alignItems: "center", flexWrap: "wrap", m: -1 }}>
                  {data.genres.map((genre) => (
                    <Badge key={genre.id} m="1" variant="plain">
                      {genre.name}
                    </Badge>
                  ))}
                </Flex>
              )}
            </Box>
            <Text sx={{ gridArea: "overview" }}>{data.overview}</Text>
            {/*             {data.imdb_id && (
                <Link
                  href={`https://www.imdb.com/title/${data.imdb_id}`}
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
        {data.backdrop_path && (
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
                backgroundImage: (theme) =>
                  `linear-gradient(to top, ${theme.colors.background}, transparent)`,
              },
            }}
          >
            <TmdbImage
              path={data.backdrop_path}
              imageType="backdrop"
              sizes="100vw"
              sx={{
                objectFit: "cover",
                objectPosition: "50%",
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        )}
      </Box>
    );
  }

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return <Error />;
  }

  return null;
};

export default Movie;
