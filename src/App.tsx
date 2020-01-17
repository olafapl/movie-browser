import React from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import "whatwg-fetch";
import { theme, GlobalStyles } from "styles";
import store from "store";
import Movies from "features/movies/Movies";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Movies />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
