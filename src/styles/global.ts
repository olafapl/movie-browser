import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
  &,
  &:after,
  &:before {
    box-sizing: border-box;
  }
}


html,
body,
#root {
  height: 100%;
}

body {
  color: ${({ theme }) => theme.colors.fg};
  background-color: ${({ theme }) => theme.colors.bg};
}

#root {
  display: flex;
  flex-direction: column;
}

a {
  cursor: pointer;
  color: inherit;

  &:hover,
  &:focus,
  &:active {
    color: inherit;
  }
}

img {
  display: block;
}

p,
ul,
ol,
li,
img,
h1,
h2,
h3,
h4,
h5,
h6 {
  &:last-child {
    margin-bottom: 0;
  }
}

`;

export default GlobalStyles;
