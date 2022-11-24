import { Box, Divider, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import MuiIcon from "../../MuiIcon/MuiIcon";

const AddCategoryItem: React.FC<{ openCategoryModal: () => void }> = ({
  openCategoryModal,
}) => {
  return (
    <Box
      marginBottom={"0.5rem"}
      display={"flex"}
      alignItems={"center"}
      gap={"1.8rem"}
      padding={"0.5rem"}
      sx={{
        cursor: "pointer",
        "&:hover": { backgroundColor: grey[200] },
        transition: "background-color 0.2s ease-in-out",
      }}
      onClick={openCategoryModal}
    >
      <Box fontSize={"2.2em"}>
        <MuiIcon iconName={"Add"}></MuiIcon>
      </Box>
      <Box flexGrow={1}>
        <Typography
          marginRight={"15px"}
          fontSize={"1.05em"}
          marginBottom={"0.5rem"}
        >
          Add New Category
        </Typography>
        <Divider />
      </Box>
    </Box>
  );
};

export default AddCategoryItem;
