import { DispatchContext, StateContext } from "../../contexts/UserDataContext";
import React, { useContext, useEffect, useState } from "react";

import AddCategoryItem from "./AddCategoryItem/AddCategoryItem";
import CategoriesEditItem from "../CategoriesEditItem/CategoriesEditItem";
import ContentContainer from "../ContentContainer/ContentContainer";

const CategoriesEditList: React.FC = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [categories, setCategories] = useState([
    ...state.user.incomes,
    ...state.user.expenses,
  ]);
  useEffect(() => {
    setCategories([...state.user.incomes, ...state.user.expenses]);
    // eslint-disable-next-line
  }, [state.categoryChangesCount]);

  const openCategoryModal = () => {
    dispatch({ type: "TOGGLE-CATEGORY-MODAL" });
  };

  return (
    <ContentContainer title="Categories">
      <AddCategoryItem openCategoryModal={openCategoryModal} />
      {categories.map((category) => (
        <CategoriesEditItem {...category} key={category.id} />
      ))}
    </ContentContainer>
  );
};

export default CategoriesEditList;
