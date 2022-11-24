import { Box, Typography, Divider } from "@mui/material";
import { grey, teal } from "@mui/material/colors";
import React, { useContext } from "react";
import MuiIcon, { MuiIconType } from "../MuiIcon/MuiIcon";
import { CategoryProps } from "../../pages/WelcomeWizard/CategoriesList/CategoriesList";
import { Stack } from "@mui/system";
import { DispatchContext } from "../../contexts/UserDataContext";

const CategoriesEditItem: React.FC<CategoryProps> = (props) => {
  const color = props.type === "Expense" ? "error" : "success";
  const dispatch = useContext(DispatchContext);
  const adjective =
    props.type === "Expense" && props.expected_amount > 0
      ? "BUDGET"
      : props.type === "Income" && props.expected_amount > 0
      ? "PLANNED"
      : "NO BUDGET LIMIT";

  return (
    <Box
      marginBottom={"0.7rem"}
      display={"flex"}
      alignItems={"center"}
      gap={"2.2rem"}
      color={color}
      padding={"0.5rem"}
      position={"relative"}
      sx={{
        cursor: "pointer",
        "&:hover": { backgroundColor: grey[200] },
        transition: "background-color 0.2s ease-in-out",
      }}
      onClick={() => {
        dispatch({
          type: "SET-UPDATING-CATEGORY",
          payload: { id: props.id, type: props.type },
        });
      }}
    >
      {!props.is_selected && (
        <Box
          position={"absolute"}
          bgcolor={grey[100]}
          height={"100%"}
          width={"100%"}
          sx={{ opacity: 0.5 }}
          textAlign={"center"}
        ></Box>
      )}
      <Box fontSize={"1.8em"}>
        <MuiIcon
          iconName={props.icon_name as MuiIconType}
          color={color}
        ></MuiIcon>
      </Box>
      <Box flexGrow={1}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          marginBottom={"0.5rem"}
        >
          <Typography
            marginRight={"15px"}
            color={color === "error" ? color : teal[600]}
            fontSize={"1.05em"}
          >
            {props.category_name}
          </Typography>

          <Stack>
            <Typography
              color={color === "error" ? color : teal[600]}
              fontSize={"1.05em"}
              component={"span"}
              alignSelf={"flex-end"}
            >
              {props.expected_amount > 0 ? props.expected_amount : ""}
            </Typography>
            <Typography
              color={grey[600]}
              fontSize={"0.5em"}
              component={"span"}
              alignSelf={"flex-end"}
              maxWidth={"40px"}
              sx={{ wordSpacing: "2rem", textAlign: "center" }}
              zIndex={2}
            >
              {adjective}
            </Typography>
          </Stack>
        </Box>
        <Divider />
      </Box>
    </Box>
  );
};

export default CategoriesEditItem;
