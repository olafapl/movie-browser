import { darken, mix } from "polished";
import { rhythm, scale } from "./typography";

const gray = "#333";
const white = "#fff";

const colors = {
  fg: gray,
  fgLight: mix(0.67, gray, white),
  bg: white,
  bgLight: darken(0.05, white)
};

const theme = {
  breakpoints: {
    xs: "380px",
    sm: "768px",
    md: "1024px",
    lg: "1200px",
    xl: "1600px"
  },
  containerWidth: "1200px",
  space: (value: string) => {
    return value
      .split(" ")
      .map(space => rhythm(((space as unknown) as number) / 4))
      .join(" ");
  },
  fontWeights: {
    normal: 400,
    bold: 700
  },
  textStyles: {
    huge: scale(2),
    h1: scale(5 / 5),
    h2: scale(3 / 5),
    h3: scale(2 / 5),
    h4: scale(0 / 5),
    h5: scale(-1 / 5),
    h6: scale(-1.5 / 5)
  },
  colors
};

export default theme;

type Theme = typeof theme;

declare module "styled-components" {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends Theme {}
  /* eslint-enable @typescript-eslint/no-empty-interface */
}
