import { Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CategoriesProgressList from "../../components/CategoriesProgressList/CategoriesProgressList";
import EntriesList from "../../components/EntriesList/EntriesList";
import { StateContext } from "../../contexts/UserDataContext";

const Overview: React.FC = () => {
  const state = useContext(StateContext);
  const [incomes, setIncomes] = useState(state.user.incomes);
  const [expenses, setExpenses] = useState(state.user.expenses);

  useEffect(() => {
    setIncomes([...state.user.incomes]);
    setExpenses([...state.user.expenses]);
    // eslint-disable-next-line
  }, [state.entriesChangesCount, state.categoryChangesCount]);

  return (
    <Stack alignItems={"center"} paddingBottom={"7rem"}>
      <CategoriesProgressList type={"Incomes"} categoriesArray={incomes} />
      <CategoriesProgressList type={"Expenses"} categoriesArray={expenses} />
      <EntriesList />
    </Stack>
  );
};

export default Overview;
