import { Box, Typography, Input } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import MuiIcon, { MuiIconType } from "../../../../components/MuiIcon/MuiIcon";
import { CategoryProps } from "../../CategoriesList/CategoriesList";

interface CategoryAmountItemProps {
  icon_name: MuiIconType;
  category_name: string;
  id: string;
  button: HTMLButtonElement;
  array: CategoryProps[];
}

const CategoryAmountItem: React.FC<CategoryAmountItemProps> = (props) => {
  const [inputValue, setInputValue] = useState<number | "">(0);
  const categoryIndex = props.array.findIndex(
    (category) => category.id === props.id
  );
  const handleChange = useCallback(() => {
    Object.assign(props.array[categoryIndex], {
      expected_amount: Math.abs(+inputValue),
    });
  }, [inputValue, props.array, categoryIndex]);

  useEffect(() => {
    handleChange();
  }, [inputValue, handleChange]);

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
        <Input
          placeholder="0"
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value ? +e.target.value : "")}
          sx={{
            width: "80px",
            color: "grey",
            "::before": {
              borderBottom: "0px",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default CategoryAmountItem;
