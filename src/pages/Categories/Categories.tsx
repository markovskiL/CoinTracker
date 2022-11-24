import CategoriesEditList from "../../components/CategoriesEditList/CategoreisEditList";
import React from "react";
import { Stack } from "@mui/material";

const Categories: React.FC = () => {
  return (
    <Stack alignItems={"center"} paddingBottom={"7rem"}>
      <CategoriesEditList />
    </Stack>
  );
};

export default Categories;
