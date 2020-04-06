import { createContext } from "react";

interface SearchContextState {
  movies: Tmdb.MovieResult[] | null;
  query: string;
  setQuery: (query: string) => void;
  page: number;
  setPage: (page: number) => void;
  totalPages: number | null;
  isFetching: boolean;
  error: string | null;
}

const initialState: SearchContextState = {
  movies: null,
  query: "",
  setQuery: (query: string) => {},
  page: 1,
  setPage: (page: number) => {},
  totalPages: null,
  isFetching: false,
  error: null,
};

const SearchContext = createContext(initialState);

export default SearchContext;
