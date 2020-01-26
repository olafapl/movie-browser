import { useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";

const useQueryParam = (
  key: string
): [string | string[] | null, (value: string | string[]) => void] => {
  const history = useHistory();
  const location = useLocation();
  const setValue = useCallback(
    (value: string | string[]) => {
      const parsedQueryString = queryString.parse(location.search);
      history.push({
        search: queryString.stringify({ ...parsedQueryString, [key]: value })
      });
    },
    [location, history, key]
  );
  return [queryString.parse(location.search)[key] ?? null, setValue];
};

export default useQueryParam;
