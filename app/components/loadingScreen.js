import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function LoadingScreen() {
  return (
    <div className=" flex justify-center items-center h-[100vh]">
      <Box sx={{display: "flex", color: "#65a30d"}}>
        <CircularProgress size={70} color="inherit" />
      </Box>
    </div>
  );
}

export default LoadingScreen;
