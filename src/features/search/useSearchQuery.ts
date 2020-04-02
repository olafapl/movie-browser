import { useState, useEffect } from "react";
import { useDebounce } from "use-lodash-debounce";
import { useLocation } from "react-router-dom";
import useQueryParam from "hooks/useQueryParam";

const useSearchQuery = (): [string, (query: string) => void] => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [queryParam, setQueryParam] = useQueryParam("query");

  useEffect(() => {
    if (location.pathname === "/search") {
      setQueryParam(debouncedQuery);
    }
  }, [debouncedQuery, setQueryParam, location.pathname]);

  return [query, setQuery];
};

export default useSearchQuery;
