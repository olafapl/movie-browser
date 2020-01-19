import React from "react";
import { ThemeProvider, CSSReset, DarkMode } from "@chakra-ui/core";
import { Global } from "@emotion/core";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "whatwg-fetch";
import store, { persistor } from "store";
import Movies from "features/movies/Movies";
import Movie from "features/movies/Movie";
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
              <Switch>
                <Route path="/movie/:id">
                  <Movie />
                </Route>
                <Route path="/">
                  <Movies />
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
