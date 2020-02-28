import baseTheme from "@theme-ui/preset-dark";
import { alpha } from "@theme-ui/color";
import { merge } from "@theme-ui/core";

const colors = {
  white: "rgba(255, 255, 255, 0.9)",
  text: "rgba(255, 255, 255, 0.9)",
  background: "#000",
  primary: "#4392f1",
  secondary: "#a59bde",
  muted: "#222"
};

const theme = merge(baseTheme, {
  colors,
  radii: [0, 4, 999999],
  text: {
    heading: {
      fontSize: 5,
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading"
    },
    truncated: {
      maxWidth: "100%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  },
  shadows: {
    outline: `0 0 0 2px ${colors.primary} inset`
  },
  buttons: {
    base: {
      fontWeight: "bold",
      borderRadius: 1,
      cursor: "pointer",
      userSelect: "none",
      transition: "background-color 0.2s ease, color 0.2s ease"
    },
    primary: {
      variant: "buttons.base",
      color: "primary"
    },
    secondary: {
      variant: "buttons.base",
      color: "secondary"
    },
    ghost: {
      variant: "buttons.base",
      color: "text",
      backgroundColor: "transparent",
      ":hover, :focus": {
        backgroundColor: "muted"
      }
    },
    menu: {
      variant: "buttons.base"
    },
    close: {
      variant: "buttons.base"
    }
  },
  badges: {
    plain: {
      color: alpha("text", 0.75),
      backgroundColor: alpha("text", 0.15),
      borderRadius: 1,
      textTransform: "uppercase"
    }
  },
  forms: {
    input: {
      borderRadius: 1,
      borderColor: "muted"
    }
  },
  sizes: {
    container: 1200
  },
  layout: {
    container: {
      display: "flex",
      flexDirection: "column",
      p: [3, 4]
    }
  },
  links: {
    nav: {
      px: 3,
      py: 2
    },
    logo: {
      color: "text",
      textDecoration: "none",
      fontSize: 3,
      fontWeight: "bold",
      ":hover, :focus": {
        textDecoration: "underline"
      }
    }
  }
});

export default theme;
