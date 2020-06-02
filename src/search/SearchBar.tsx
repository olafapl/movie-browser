import React, { useCallback, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDebounce } from "use-lodash-debounce";
import { Input } from "theme-ui";
import { encodeString } from "use-query-params";
import SearchContext from "search/SearchContext";
import useMountEffect from "common/useMountEffect";
import usePrevious from "common/usePrevious";

const SearchBar = (props: React.ComponentProps<typeof Input>) => {
  const { query, setQuery } = useContext(SearchContext);
  const [value, setValue] = useState(query);
  const debouncedValue = useDebounce(value, 500);
  const previousDebouncedValue = usePrevious(debouncedValue);
  const history = useHistory();

  useEffect(() => {
    if (
      previousDebouncedValue !== debouncedValue &&
      debouncedValue.length > 0
    ) {
      if (history.location.pathname !== "/search") {
        history.push({
          pathname: "/search",
          search: `?query=${encodeString(debouncedValue)}`,
        });
      } else if (query !== debouncedValue) {
        setQuery(debouncedValue);
      }
    }
  }, [query, setQuery, debouncedValue, previousDebouncedValue, history]);

  useEffect(() => {
    setValue(query);
  }, [query]);

  useMountEffect(() => {
    if (history.location.pathname === "/search") {
      setValue(query);
    }
  });

  const handleChange = useCallback((event: React.FormEvent) => {
    setValue((event.target as HTMLInputElement).value);
  }, []);

  return (
    <Input
      placeholder="Search ..."
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
};

export default SearchBar;
