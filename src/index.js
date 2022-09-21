import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import themePalette from "./themePalette";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

export const muiCache = createCache({
  key: "mui",
  prepend: true,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CacheProvider value={muiCache}>
    <ThemeProvider theme={themePalette}>
      <App />
    </ThemeProvider>
  </CacheProvider>
);
