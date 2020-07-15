export interface QueryParam {
  key: string;
  value?: string | number | (string | number)[];
}

export const fetchEndpoint = async <T>(
  endpoint: string,
  queryParams: QueryParam[] = []
): Promise<T> => {
  const queryString = `?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }${queryParams
    .map(({ key, value }) => {
      if (value === undefined) {
        return `&${encodeURIComponent(key)}`;
      }
      return `&${encodeURIComponent(key)}=${encodeURIComponent(
        Array.isArray(value) ? value.join(",") : value
      )}`;
    })
    .join("")}`;
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

export interface Config {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Language {
  iso_639_1: string;
  name: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: object | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieListResult {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  media_type?: "movie";
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Paginated<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export const fetchPaginated = <T = MovieListResult>(
  endpoint: string,
  page: number,
  queryParams: QueryParam[] = []
) => {
  return fetchEndpoint<Paginated<T>>(endpoint, [
    ...queryParams,
    { key: "page", value: page },
  ]);
};
