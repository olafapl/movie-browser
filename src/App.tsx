import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Global } from "@emotion/core";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "whatwg-fetch";
import store, { persistor } from "store";
import Movies from "features/movies/Movies";
import { globalStyles } from "styles";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <PersistGate persistor={persistor}>
          <CSSReset />
          <Global styles={globalStyles} />
          <Movies />
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
