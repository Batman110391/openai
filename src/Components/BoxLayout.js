import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

function BoxLayout({ children, style }) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: {
          xs: "24px 8px 8px 8px",
          sm: 3,
        },
        width: {
          xs: "100%",
          sm: `calc(100% - 240px)`,
        },
        height: style?.height || `calc(100% - 50px)`,
        ...style,
      }}
    >
      <Toolbar />
      {children}
    </Box>
  );
}

export default BoxLayout;
