import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Global } from "@emotion/core";
import { Provider } from "react-redux";
import "whatwg-fetch";
import store from "store";
import Movies from "features/movies/Movies";
import { globalStyles } from "styles";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <CSSReset />
        <Global styles={globalStyles} />
        <Movies />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
