import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function LoadingScreen() {
  return (
    <div className=" flex justify-center items-center h-[100vh]">
      <Box sx={{display: "flex"}}>
        <CircularProgress size={50} color="success" />
      </Box>
    </div>
  );
}

export default LoadingScreen;
