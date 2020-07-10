import { createContext } from "react";
import useSearch from "search/useSearch";

type UseSearch = ReturnType<typeof useSearch>;

interface SearchContextState {
  movies: UseSearch[0];
  query: UseSearch[1];
  setQuery: UseSearch[2];
  page: UseSearch[3];
  setPage: UseSearch[4];
  totalPages: UseSearch[5];
  status: UseSearch[6];
  error: UseSearch[7];
}

const initialState: SearchContextState = {
  movies: undefined,
  query: "",
  setQuery: () => {},
  page: 1,
  setPage: () => {},
  totalPages: undefined,
  status: "loading",
  error: undefined,
};

const SearchContext = createContext(initialState);

export default SearchContext;
