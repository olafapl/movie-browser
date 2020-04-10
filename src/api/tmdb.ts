interface Arg {
  key: string;
  value?: string | number | (string | number)[];
}

export const getEndpoint = async <T>(
  endpoint: string,
  args: Arg[] = []
): Promise<T> => {
  const queryString = `?api_key=${process.env.REACT_APP_TMDB_API_KEY}${args.map(
    ({ key, value }) => {
      if (value === undefined) {
        return `&${encodeURIComponent(key)}`;
      }
      return `&${encodeURIComponent(key)}=${encodeURIComponent(
        Array.isArray(value) ? value.join(",") : value
      )}`;
    }
  )}`;
  const response = await fetch(
    `https://api.themoviedb.org/3/${endpoint}${queryString}`
  );
  const jsonResponse = await response.json();
  if (response.ok) {
    return jsonResponse;
  }
  if ("status_code" in jsonResponse && "status_message" in jsonResponse) {
    throw new Error(
      `${jsonResponse.status_code}: ${jsonResponse.status_message}`
    );
  }
  throw new Error("Something went wrong");
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
    (size) =>
      (imageUrls[size] = `${tmdbConfig.images.secure_base_url}${size}${path}`)
  );
  return imageUrls;
};

export const getPaginated = <T>(
  endpoint: string,
  page: number,
  args: Arg[] = []
) => {
  return getEndpoint<Tmdb.PaginatedResults<T>>(endpoint, [
    ...args,
    { key: "page", value: page },
  ]);
};

export const getMovies = (endpoint: string, page: number) => {
  return getPaginated<Tmdb.MovieResult>(endpoint, page);
};

export const getMovie = (movieId: number) => {
  return getEndpoint<Tmdb.Movie>(`movie/${movieId}`);
};

export const searchMovies = (query: string, page: number) => {
  return getPaginated<Tmdb.MovieResult>("search/movie", page, [
    { key: "query", value: query },
  ]);
};
