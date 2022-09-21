import { createTheme } from "@mui/material/styles";

const themePalette = createTheme({
  palette: {
    primary: {
      main: "#3F51B5",
      dark: "#192882",
    },
    secondary: {
      light: "#F5F5F5",
      main: "#E0E0E0",
      dark: "rgba(0, 0, 0, 0.54)",
    },
  },
  /* components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          overflow: 'hidden',
          height: '100%',
        },
        'html, body, #root': {
          height: `-webkit-fill-available`,
        },
      },
    },
  }, */
});

export default themePalette;
