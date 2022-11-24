import React, { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const ContentContainer: React.FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <Stack
      width={"90%"}
      maxWidth={"1536px"}
      margin={"1.3rem 0"}
      boxShadow={"10px 9px 5px 0px rgba(0,0,0,0.1)"}
    >
      <Box bgcolor={grey[100]} marginBottom={"1rem"}>
        <Typography color={grey[500]} margin={"0.7rem"} fontSize={"1.1em"}>
          {title}
        </Typography>
      </Box>
      <Box padding={"0.7rem 1.2rem"}>{children}</Box>
    </Stack>
  );
};

export default ContentContainer;
