import { Box } from "@mui/material";
import React from "react";
import { MuiIconType } from "../../../components/MuiIcon/MuiIcon";
import { CategoryProps } from "../CategoriesList/CategoriesList";
import CategoryAmountItem from "./CategoryAmountItem/CategoryAmountItem";

interface CategoriesAmountListProps {
  categoryArray: CategoryProps[];
  button: HTMLButtonElement;
}

const CategoriesAmountList: React.FC<CategoriesAmountListProps> = ({
  categoryArray,
  button,
}) => {
  const selectedItems = categoryArray.filter(category => category.is_selected === true)
  return (
    <Box sx={{ width: "100%" }}>
      {selectedItems.map((category) => (
        <CategoryAmountItem
          {...category}
          icon_name={category.icon_name as MuiIconType}
          key={category.id}
          id={category.id}
          button={button}
          array={categoryArray}
        />
      ))}
    </Box>
  );
};

export default CategoriesAmountList;
