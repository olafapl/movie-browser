import React, { useCallback } from "react";
import { Input } from "theme-ui";
import { useHistory } from "react-router-dom";
import useSearchQuery from "features/search/useSearchQuery";

const SearchBar = (props: React.ComponentProps<typeof Input>) => {
  const [query, setQuery] = useSearchQuery();
  const history = useHistory();
  const redirectoToSearch = useCallback(() => {
    if (history.location.pathname !== "/search") {
      history.push({ pathname: "/search" });
    }
  }, [history]);
  const onInputChange = useCallback(
    (event: React.FormEvent) => {
      redirectoToSearch();
      setQuery((event.target as HTMLInputElement).value);
    },
    [redirectoToSearch, setQuery]
  );
  const onInputKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.keyCode === 13) {
        redirectoToSearch();
      }
    },
    [redirectoToSearch]
  );
  return (
    <Input
      placeholder="Search ..."
      value={query}
      onChange={onInputChange}
      onKeyUp={onInputKeyUp}
      {...props}
    />
  );
};

export default SearchBar;
