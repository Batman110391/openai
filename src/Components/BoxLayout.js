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
        width: { sm: `calc(100% - 240px)` },
      }}
    >
      <Toolbar />
      {children}
    </Box>
  );
}

export default BoxLayout;
