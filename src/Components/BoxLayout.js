import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

function BoxLayout({ children }) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: {
          xs: "100%",
          sm: `calc(100% - 240px)`,
          md: "100%",
        },
        height: `calc(100% - 50px)`,
      }}
    >
      <Toolbar />
      {children}
    </Box>
  );
}

export default BoxLayout;
