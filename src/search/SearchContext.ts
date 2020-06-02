import { createContext } from "react";

interface SearchContextState {
  movies?: Tmdb.MovieListResult[];
  query: string;
  setQuery: (query: string) => void;
  page: number;
  setPage: (page: number) => void;
  totalPages?: number;
  status: Status;
  error?: string;
}

const initialState: SearchContextState = {
  movies: undefined,
  query: "",
  setQuery: (query: string) => {},
  page: 1,
  setPage: (page: number) => {},
  totalPages: undefined,
  status: "loading",
  error: undefined,
};

const SearchContext = createContext(initialState);

export default SearchContext;
