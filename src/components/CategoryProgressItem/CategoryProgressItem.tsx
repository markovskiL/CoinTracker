import { Box, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useEffect, useState } from "react";
import { CategoryProps } from "../../pages/WelcomeWizard/CategoriesList/CategoriesList";
import MuiIcon, { MuiIconType } from "../MuiIcon/MuiIcon";
import { deepPurple, teal} from "@mui/material/colors";

type ColorProps =
  | "primary"
  | "inherit"
  | "success"
  | "error"
  | "secondary"
  | "info"
  | "warning"
  | undefined;

const CategoryProgressItem: React.FC<CategoryProps> = (props) => {
  const onePercentVal = props.expected_amount / 100;
  const [progress, setProgress] = useState<number>(0);
  const [color, setColor] = useState<ColorProps>("primary");

  useEffect(() => {
    const value = props.current_amount / onePercentVal;
    const progressValue = value > 100 ? 100 : value || 0;
    setProgress(progressValue);
  }, [props.current_amount, onePercentVal]);

  useEffect(() => {
    if (props.type === "Expense") {
      if (props.expected_amount >= props.current_amount) {
        setColor("success");
      } else {
        setColor("error");
      }
    }
  }, [props.current_amount, props.expected_amount, props.type]);

  return (
    <Box
      marginBottom={"1.5rem"}
      display={"flex"}
      alignItems={"center"}
      gap={"2.2rem"}
    >
      <Box fontSize={"1.8em"}>
        <MuiIcon
          iconName={props.icon_name as MuiIconType}
          color={color === "error" ? color : "inherit"}
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
            color={color === "error" ? color : "inherit"}
            fontSize={"1.05em"}
          >
            {props.category_name}
          </Typography>
          <Typography
            color={color === "error" ? color : "inherit"}
            fontSize={"1.05em"}
          >
            <span>{props.current_amount}</span>/
            <span>{props.expected_amount}</span>
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          color={color}
          sx={{
            backgroundColor: color === "primary" ? deepPurple[100] : teal[100],
          }}
        />
      </Box>
    </Box>
  );
};

export default CategoryProgressItem;
