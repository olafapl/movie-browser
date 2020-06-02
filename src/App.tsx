import React from "react";
import { ThemeProvider, Flex } from "theme-ui";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Global } from "@emotion/core";
import { QueryParamProvider } from "use-query-params";
import {
  ReactQueryConfigProvider,
  ReactQueryProviderConfig,
} from "react-query";
import TmdbConfigProvider from "tmdbConfig/TmdbConfigProvider";
import Movies from "movies/Movies";
import Movie from "movies/Movie";
import About from "about/About";
import SearchResults from "search/SearchResults";
import SearchProvider from "search/SearchProvider";
import Nav from "navigation/Nav";
import Error from "common/Error";
import theme from "styles/theme";
import globalStyles from "styles/global";

const queryConfig: ReactQueryProviderConfig = {
  refetchOnWindowFocus: false,
  staleTime: 86400000, // 1 day
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Router>
        <ReactQueryConfigProvider config={queryConfig}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <TmdbConfigProvider>
              <SearchProvider>
                <Nav />
                <Flex sx={{ flex: 1, flexDirection: "column" }}>
                  <Switch>
                    <Route exact path="/movie/:id">
                      <Movie />
                    </Route>
                    <Route exact path="/movies/popular">
                      <Movies title="Popular" endpoint="movie/popular" />
                    </Route>
                    <Route exact path="/movies/top-rated">
                      <Movies title="Top rated" endpoint="movie/top_rated" />
                    </Route>
                    <Route exact path="/(movies/trending|movies|)/">
                      <Movies title="Trending" endpoint="trending/movie/day" />
                    </Route>
                    <Route exact path="/about">
                      <About />
                    </Route>
                    <Route exact path="/search">
                      <SearchResults />
                    </Route>
                    <Route>
                      <Error />
                    </Route>
                  </Switch>
                </Flex>
              </SearchProvider>
            </TmdbConfigProvider>
          </QueryParamProvider>
        </ReactQueryConfigProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
