import { Box, Checkbox, Typography } from "@mui/material";
import React, { useState } from "react";
import MuiIcon, {
  MuiIconType,
} from "../../../../components/MuiIcon/MuiIcon";

interface CategoryItemProps {
  icon_name: MuiIconType;
  category_name: string;
  is_selected: boolean;
  index: number;
  handleCheck: (index: number, value: boolean) => void;
  incrementChangesCount: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = (props) => {
  const [isSelected, setIsSelected] = useState<boolean>(props.is_selected);

  const handleClick = () => {
    setIsSelected(!isSelected);
    props.handleCheck(props.index, !isSelected);
    props.incrementChangesCount();
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ marginLeft: "0.5rem" }}>
        <MuiIcon iconName={props.icon_name} />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1.5px solid lightgrey",
          flexGrow: "1",
          marginLeft: "1.5rem",
        }}
      >
        <Typography>{props.category_name}</Typography>
        <Checkbox
          color={"secondary"}
          checked={isSelected}
          onClick={handleClick}
        />
      </Box>
    </Box>
  );
};

export default CategoryItem;
