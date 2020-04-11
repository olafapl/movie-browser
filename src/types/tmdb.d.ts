/** Types are translated to TS from the TMDB API docs at https://developers.themoviedb.org/3 **/

declare namespace Tmdb {
  type MediaType = "all" | "movie" | "tv" | "person";
  type TimeWindow = "day" | "week";

  interface Config {
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

  interface Genre {
    id: number;
    name: string;
  }

  interface ProductionCompany {
    name: string;
    id: number;
    logo_path: string | null;
    origin_country: string;
  }

  interface ProductionCountry {
    iso_3166_1: string;
    name: string;
  }

  interface Language {
    iso_639_1: string;
    name: string;
  }

  interface Movie {
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

  interface MovieListResult {
    adult: boolean;
    backdrop_path: string | null;
    id: number;
    video: boolean;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
  }

  interface Paginated<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
  }

  type ImageType = "poster" | "backdrop";
}
