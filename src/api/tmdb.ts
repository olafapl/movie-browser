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

export const getTrending = (
  mediaType: Tmdb.MediaType,
  timeWindow: Tmdb.TimeWindow = "week"
) => {
  return getEndpoint(`trending/${mediaType}/${timeWindow}`);
};

export const getMovie = (movieId: number): Promise<Tmdb.Movie> => {
  return getEndpoint(`movie/${movieId}`);
};
