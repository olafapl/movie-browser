// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useCallback, useRef, useMemo } from "react";
/** @jsx jsx */
import { jsx, Text, Container, Button, Flex, Link, Box } from "theme-ui";
import { useVirtual } from "react-virtual";
import { Link as RouterLink } from "react-router-dom";
import { TmdbImage, Placeholder } from "common/TmdbImage";
import { Helmet } from "react-helmet";
import Loading from "common/Loading";
import Error from "common/Error";
import { QueryParam, MovieListResult } from "common/api";
import usePaginated from "common/usePaginated";
import useDimensions from "common/useDimensions";
import useBreakpoints from "common/useBreakpoints";
import { useTheme } from "styles/theme";

interface MoviesProps {
  title: string;
  /**
   * TMDb API endpoint to fetch data from.
   */
  endpoint: string;
  /***
   * Defaults to the title text.
   */
  heading?: string;
  /**
   * Additional query params to be appended to the API request.
   */
  queryParams?: QueryParam[];
}

const Movies = ({ title, endpoint, heading, queryParams }: MoviesProps) => {
  const {
    status,
    data,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = usePaginated<MovieListResult>(endpoint, queryParams);
  const movies = useMemo(
    () =>
      data?.reduce(
        (prev, current) => prev.concat(current.results),
        [] as MovieListResult[]
      ) ?? [],
    [data]
  );

  // Virtualization
  const { theme } = useTheme();
  const parentRef = useRef(null);
  const { width } = useDimensions(parentRef);
  const columnCount = useBreakpoints([2, 3, 4, 5]);
  const columnWidth = useMemo(() => width / columnCount, [width, columnCount]);
  const rowVirtualizer = useVirtual({
    parentRef,
    size: Math.ceil(movies.length / columnCount),
    estimateSize: useCallback(
      () => 1.5 * (columnWidth - 2 * theme.space[3]) + 2 * theme.space[3],
      [columnWidth, theme]
    ),
  });
  const columnVirtualizer = useVirtual({
    parentRef,
    size: columnCount,
    horizontal: true,
    estimateSize: useCallback(() => columnWidth, [columnWidth]),
  });

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return <Error />;
  }

  return (
    <Container sx={{ flex: 1 }}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Text as="h1" variant="heading" mb="4">
        {heading || title}
      </Text>
      <Box
        ref={parentRef}
        sx={{
          position: "relative",
          height: rowVirtualizer.totalSize,
          m: -3,
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <React.Fragment key={virtualRow.index}>
            {columnVirtualizer.virtualItems.map((virtualColumn) => {
              const movie =
                movies[columnCount * virtualRow.index + virtualColumn.index];

              return movie ? (
                <Box
                  key={virtualColumn.index}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: virtualColumn.size,
                    height: virtualRow.size,
                    transform: `translate(${virtualColumn.start}px, ${virtualRow.start}px)`,
                    padding: 3,
                  }}
                >
                  <Link
                    as={RouterLink}
                    // @ts-ignore
                    to={`/movie/${movie.id}`}
                    sx={{
                      display: "flex",
                      position: "relative",
                      height: "100%",
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
                          path={
                            movies[
                              columnCount * virtualRow.index +
                                virtualColumn.index
                            ].poster_path!
                          }
                          imageType="poster"
                          alt={
                            movies[
                              columnCount * virtualRow.index +
                                virtualColumn.index
                            ].title
                          }
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
                            {
                              movies[
                                columnCount * virtualRow.index +
                                  virtualColumn.index
                              ].title
                            }
                          </Text>
                        </React.Fragment>
                      )}
                    </Flex>
                  </Link>
                </Box>
              ) : null;
            })}
          </React.Fragment>
        ))}
      </Box>
      {canFetchMore && (
        <Button
          mt="4"
          onClick={() => fetchMore()}
          disabled={!!isFetchingMore}
          variant="ghost"
        >
          {isFetchingMore ? "Loading ..." : "Load more"}
        </Button>
      )}
    </Container>
  );
};

export default Movies;
