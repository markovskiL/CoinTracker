import React from "react";
import { Outlet } from "react-router-dom";
import LogoCompact from "../images/Logo.png";
import Container from "@mui/material/Container";
import { Box, Stack, Typography } from "@mui/material";
const FirstLayout: React.FC = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Stack
        sx={{
          alignItems: "center",
          width: "90%",
          height: "800px",
        }}
      >
        <Stack alignItems={"center"} padding={"50px 0"}>
          <img
            src={LogoCompact}
            alt="coin tracker logo"
            style={{ maxWidth: "100%", height: "80px" }}
          />
          <Box fontSize={"1.8em"} display={"flex"} marginTop={"5px"}>
            <Typography fontSize={"inherit"} color={"#2800a4"}>
              Coin
            </Typography>
            <Typography
              fontSize={"inherit"}
              color={"#18baa5"}
              fontWeight={"300"}
            >
              Tracker
            </Typography>
          </Box>
        </Stack>
        <Outlet />
      </Stack>
    </Container>
  );
};

export default FirstLayout;
