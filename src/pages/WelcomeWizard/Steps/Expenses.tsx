import { Stack, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import expensesListJSON from "../../../data/expenses.json";
import { steps } from "../WelcomeWizard";
import CategoriesList, {
  CategoryProps,
} from "../CategoriesList/CategoriesList";

const expensesList = expensesListJSON.expenses;
interface ExpensesProps {
  handleClick: (
    currentStep: steps,
    nextStep: steps,
    payload: CategoryProps[]
  ) => void;
}
const Expenses: React.FC<ExpensesProps> = ({ handleClick }) => {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  return (
    <Stack
      alignItems={"center"}
      width={"100%"}
      height={{ xxs: "100%", md: "auto" }}
    >
      <Stack alignItems={"center"} width={"100%"} height={"100%"}>
        <Typography
          paragraph
          sx={{ marginBottom: "3rem", textAlign: "center" }}
        >
          Choose what you spend money on
        </Typography>
        <CategoriesList
          categoryArray={expensesList}
          setButtonDisabled={setButtonDisabled}
        />
      </Stack>
      <Button
        variant="contained"
        sx={{
          width: "100%",
          marginBottom: "2rem",
          marginTop: "2rem",
        }}
        disabled={buttonDisabled}
        onClick={() => {
          handleClick("expenses", "expensesAmount", expensesList);
        }}
      >
        ADD
      </Button>
    </Stack>
  );
};

export default Expenses;
