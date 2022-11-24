import CategoryProgressItem from "../CategoryProgressItem/CategoryProgressItem";
import { CategoryProps } from "../../pages/WelcomeWizard/CategoriesList/CategoriesList";
import ContentContainer from "../ContentContainer/ContentContainer";
import React from "react";

interface ProgressListProps {
  type: "Incomes" | "Expenses";
  categoriesArray: CategoryProps[];
}

const CategoriesProgressList: React.FC<ProgressListProps> = ({
  type,
  categoriesArray,
}) => {
  const selectedCategories = categoriesArray.filter(
    (category) => category.is_selected === true
  );
  return (
    <ContentContainer title={type}>
      {selectedCategories.map((category) => (
        <CategoryProgressItem {...category} key={category.id} />
      ))}
    </ContentContainer>
  );
};

export default CategoriesProgressList;
