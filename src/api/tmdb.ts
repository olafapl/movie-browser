interface Arg {
  key: string;
  value?: string | string[];
}

export const getEndpoint = <T>(endpoint: string, args?: Arg[]): Promise<T> => {
  const queryString = args
    ? args
        .map(
          ({ key, value }) =>
            `&${key}${
              value !== undefined
                ? `=${encodeURIComponent(
                    typeof value === "string" ? value : value.join(",")
                  )}`
                : ""
            }`
        )
        .join("")
    : "";
  return fetch(
    `https://api.themoviedb.org/3/${endpoint}?api_key=${process.env.REACT_APP_TMDB_API_KEY}${queryString}`
  ).then(result => result.json());
};

export const getConfig = () => {
  return getEndpoint<Tmdb.Config>("configuration");
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

export const getPaginated = <T>(
  endpoint: string,
  page: number,
  args?: Arg[]
) => {
  const pageArg = { key: "page", value: page.toString() };
  return getEndpoint<Tmdb.PaginatedResults<T> | Tmdb.Error>(
    endpoint,
    args ? [...args, pageArg] : [pageArg]
  );
};

export const getMovies = (endpoint: string, page: number) => {
  return getPaginated<Tmdb.MovieResult>(endpoint, page);
};

export const getMovie = (movieId: number) => {
  return getEndpoint<Tmdb.Movie | Tmdb.Error>(`movie/${movieId}`);
};

export const searchMovies = (query: string, page: number) => {
  return getPaginated<Tmdb.MovieResult>("search/movie", page, [
    { key: "query", value: query }
  ]);
};
