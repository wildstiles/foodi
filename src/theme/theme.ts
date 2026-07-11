import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#4F8CFF",
    },

    secondary: {
      main: "#FF5A76",
    },

    background: {
      default: "#0B0B0C",
      paper: "#18181B",
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#A0A0A0",
    },
  },

  shape: {
    borderRadius: 18,
  },

  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});

export default theme;
