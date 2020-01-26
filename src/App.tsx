import React from "react";
import { ThemeProvider, CSSReset, DarkMode } from "@chakra-ui/core";
import { Global } from "@emotion/core";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store, { persistor } from "store";
import Movies from "features/movies/Movies";
import Movie from "features/movies/Movie";
import About from "features/about/About";
import SearchResults from "features/search/SearchResults";
import Nav from "components/Nav";
import Error from "components/Error";
import { globalStyles, theme } from "styles";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <DarkMode>
          <PersistGate persistor={persistor}>
            <CSSReset />
            <Global styles={globalStyles} />
            <Router>
              <Nav />
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
            </Router>
          </PersistGate>
        </DarkMode>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
