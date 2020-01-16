import React from "react";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyles } from "styles";
import "features/firebase";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <p>'sup?</p>
    </ThemeProvider>
  );
};

export default App;
