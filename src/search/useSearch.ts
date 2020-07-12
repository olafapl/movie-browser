import { useContext } from "react";
import { SearchContext } from "search/SearchProvider";

const useSearch = () => {
  const state = useContext(SearchContext);
  return state;
};

export default useSearch;
