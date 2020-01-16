import Typography from "typography";

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.5,
  bodyWeight: 400,
  headerWeight: 400,
  boldWeight: 700,
  scaleRatio: 2.5,
  headerFontFamily: [
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif"
  ],
  bodyFontFamily: [
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif"
  ],
  overrideStyles: ({ scale }) => ({
    html: {
      overflowY: "unset" // Defaults to scroll if not set
    },
    h1: {
      ...scale(5 / 5)
    },
    h2: {
      ...scale(3 / 5)
    },
    h3: {
      ...scale(2 / 5)
    },
    h4: {
      ...scale(0 / 5)
    },
    h5: {
      ...scale(-1 / 5)
    },
    h6: {
      ...scale(-1.5 / 5)
    }
  })
});

typography.injectStyles();

const typographyScale = typography.scale;
export const scale = (value: number) => {
  const { fontSize, lineHeight } = typographyScale(value);
  return `font-size: ${fontSize}; line-height: ${lineHeight};`;
};

export const { rhythm } = typography;
export default typography;
