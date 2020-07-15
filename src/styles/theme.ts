import { alpha } from "@theme-ui/color";
import { useThemeUI } from "theme-ui";

const theme = {
  colors: {
    white: "rgba(255, 255, 255, 0.9)",
    text: "rgba(255, 255, 255, 0.9)",
    background: "#000",
    primary: "#4392f1",
    secondary: "#a59bde",
    muted: "#222",
  },
  fonts: {
    body:
      "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
    heading: "inherit",
    monospace: "monospace",
  },
  breakpoints: ["576px", "768px", "992px", "1200px"],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  radii: [0, 4, 999999],
  text: {
    heading: {
      fontSize: 5,
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
    truncated: {
      maxWidth: "100%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  buttons: {
    base: {
      fontWeight: "bold",
      borderRadius: 1,
      cursor: "pointer",
      userSelect: "none",
      transition: "background-color 0.2s ease, color 0.2s ease",
    },
    primary: {
      variant: "buttons.base",
      color: "primary",
    },
    secondary: {
      variant: "buttons.base",
      color: "secondary",
    },
    ghost: {
      variant: "buttons.base",
      color: "text",
      backgroundColor: "transparent",
      ":hover, :focus": {
        backgroundColor: "muted",
      },
    },
    menu: {
      variant: "buttons.base",
    },
    close: {
      variant: "buttons.base",
    },
  },
  badges: {
    plain: {
      color: alpha("text", 0.75),
      backgroundColor: alpha("text", 0.15),
      borderRadius: 1,
      textTransform: "uppercase",
    },
  },
  forms: {
    input: {
      borderRadius: 2,
      px: 3,
      borderColor: "muted",
    },
  },
  sizes: {
    container: 1200,
  },
  layout: {
    container: {
      display: "flex",
      flexDirection: "column",
      p: [3, 4],
    },
  },
  links: {
    nav: {
      fontWeight: "normal",
      px: 3,
      py: 2,
    },
    logo: {
      color: "text",
      textDecoration: "none",
      fontSize: 3,
      fontWeight: "bold",
      ":hover, :focus": {
        color: "primary",
      },
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    h1: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 5,
    },
    h2: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 4,
    },
    h3: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 3,
    },
    h4: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 2,
    },
    h5: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 1,
    },
    h6: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 0,
    },
    p: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
    a: {
      color: "text",
      textDecoration: "underline",
      ":hover,:focus": {
        color: "text",
      },
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    img: {
      maxWidth: "100%",
    },
  },
};

export type ExactTheme = typeof theme;

type ThemeUIContext = ReturnType<typeof useThemeUI>;
interface ExactThemeUIContext extends Omit<ThemeUIContext, "theme"> {
  theme: ExactTheme;
}

export const useTheme = (useThemeUI as unknown) as () => ExactThemeUIContext;

export default theme;
