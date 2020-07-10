import { useContext } from "react";
import { SearchContext, SearchContextState } from "search/SearchProvider";

const useSearch = (): SearchContextState => {
  const state = useContext(SearchContext);
  return state;
};

export default useSearch;
