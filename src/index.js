import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThemePalette from "./ThemePalette";
import { SnackbarProvider } from "notistack";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemePalette>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </ThemePalette>
);
