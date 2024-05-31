import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import React from "react";

function LoadingComponent() {
  return (
    <Box sx={{display: "flex ", color: "#65a30d"}}>
      <CircularProgress color="inherit" />
    </Box>
  );
}

export default LoadingComponent;
