const baseFontFamily = "Open Sans, sans-serif";

const palette = {
  dark: "#333",
  grey: "#999",
  smoke: "hsl(208,0%,97%)"
};

export default {
  baseFontFamily,
  colors: {
    text: palette.dark,
    selected: palette.smoke,
    hoverBackground: palette.smoke,
    hoverOutlineBorder: palette.grey
  },
  mixins: {
    smallHeadingFont: `
    font: 0.8rem ${baseFontFamily};
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.2em;
    color: ${palette.dark};
  `
  }
};
