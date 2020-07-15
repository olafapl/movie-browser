/** @jsx jsx */
import { jsx } from "theme-ui";
import useSearch from "search/useSearch";
import Movies from "movies/Movies";

const SearchResults = () => {
  const { query } = useSearch();

  return (
    <Movies
      title={`Search: ${query}`}
      heading={`Results for "${query}":`}
      endpoint="search/movie"
      queryParams={[{ key: "query", value: query }]}
    />
  );
};

export default SearchResults;
