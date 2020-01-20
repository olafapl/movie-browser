interface Arg {
  key: string;
  value?: string;
}

export const getEndpoint = (endpoint: string, args?: Arg[]) => {
  const queryString = args
    ? args
        .map(
          ({ key, value }) =>
            `&${key}` +
            (value !== undefined ? `=${encodeURIComponent(value)}` : "")
        )
        .join("")
    : "";
  return fetch(
    `https://api.themoviedb.org/3/${endpoint}?api_key=${process.env.REACT_APP_TMDB_API_KEY}${queryString}`
  ).then(result => result.json());
};

export const getConfig = (): Promise<Tmdb.Config> => {
  return getEndpoint("configuration");
};

export const getImageUrls = (
  path: string,
  tmdbConfig: Tmdb.Config,
  imageType: Tmdb.ImageType
) => {
  const imageSizes =
    imageType === "poster"
      ? tmdbConfig.images.poster_sizes
      : tmdbConfig.images.backdrop_sizes;
  const imageUrls: { [key: string]: string } = {};
  imageSizes.forEach(
    size =>
      (imageUrls[size] = `${tmdbConfig.images.secure_base_url}${size}${path}`)
  );
  return imageUrls;
};

/**
 * Generic function to fetch a collection of movies.
 * @param endpoint API endpoint.
 * @param page Page number.
 */
export const getMovies = (
  endpoint: string,
  page: number
): Promise<Tmdb.PaginatedResults<Tmdb.MovieResult> | Tmdb.Error> => {
  return getEndpoint(endpoint, [{ key: "page", value: page.toString() }]);
};

export const getMovie = (movieId: number): Promise<Tmdb.Movie | Tmdb.Error> => {
  return getEndpoint(`movie/${movieId}`);
};
