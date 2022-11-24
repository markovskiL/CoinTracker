import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MuiIconType } from "../../../components/MuiIcon/MuiIcon";
import CategoryItem from "./CategoryItem/CategoryItem";

export interface CategoryProps {
  id: string;
  category_name: string;
  type: string;
  expected_amount: number;
  current_amount: number;
  icon_name: string;
  is_selected: boolean;
}

interface CategoriesListProps {
  categoryArray: CategoryProps[];
  setButtonDisabled: (val: boolean) => void;
}

const CategoriesList: React.FC<CategoriesListProps> = ({
  categoryArray,
  setButtonDisabled,
}) => {
  const [changesCount, setChangesCount] = useState<number>(0); //When a user checks or unchecks a checkbox the count increments and useEffect is triggered
  const handleCheck = (index: number, value: boolean) => {
    categoryArray[index].is_selected = value;
  };
  const incrementChangesCount = () => {
    setChangesCount((prev) => prev + 1);
  };

  useEffect(() => {
    const selectedItems = categoryArray.filter(
      (item) => item.is_selected === true
    );
    // Disables the button if there are no items with selected property of true
    setButtonDisabled(selectedItems.length >= 1 ? false : true);

    
  }, [changesCount, categoryArray, setButtonDisabled]);

  return (
    <Box sx={{ width: "100%" }}>
      {categoryArray.map((category, i) => (
        <CategoryItem
          {...category}
          icon_name={category.icon_name as MuiIconType}
          key={category.id}
          index={i}
          handleCheck={handleCheck}
          incrementChangesCount={incrementChangesCount}
        />
      ))}
    </Box>
  );
};

export default CategoriesList;
