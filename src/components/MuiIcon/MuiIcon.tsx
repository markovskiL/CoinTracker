import * as MuiIcons from "@mui/icons-material";
import React from "react";

export type MuiIconType = keyof typeof MuiIcons;

interface MuiIconProps {
  iconName: MuiIconType;
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "info"
    | "success"
    | "action"
    | "disabled"
    | "inherit"
    | undefined;
}

const MuiIcon: React.FC<MuiIconProps> = ({ iconName, color}) => {
  const Icon = MuiIcons[iconName];
  return <Icon color={color || "secondary"} style={{ fontSize: "1em" }} />;
};

export default MuiIcon;
