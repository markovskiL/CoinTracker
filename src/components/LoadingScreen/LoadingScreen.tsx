import { Box, CircularProgress } from "@mui/material";
import React from "react";

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={"5rem"} />
    </Box>
  );
};

export default LoadingScreen;
