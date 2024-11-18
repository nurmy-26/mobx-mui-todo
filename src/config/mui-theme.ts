import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: "#63657f",
    },
    secondary: {
      main: "#cccedf",
    },
    success: {
      main: "#77feff",
    },
    error: {
      main: "#b10a20",
    },
  },
  typography: {
    fontFamily: "Open Sans, Arial, sans-serif",
    h1: {
      fontSize: "4rem",
      fontWeight: 800,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 400,
    },
    h3: {
      fontSize: "1.2rem",
      fontWeight: 400,
    },
    button: {
      fontSize: ".85rem",
      "@media (max-width:600px)": {
        fontSize: ".7rem",
      },
    },
  },
});

theme = responsiveFontSizes(theme, {
  breakpoints: ["sm", "md", "lg"],
  disableAlign: false,
  factor: 4,
});

export default theme;
