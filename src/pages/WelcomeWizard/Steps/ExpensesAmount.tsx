import { Stack, Typography, Button } from "@mui/material";
import React, { useContext, useRef } from "react";
import { StateContext } from "../../../contexts/UserDataContext";
import { steps } from "../WelcomeWizard";
import CategoriesAmountList from "../CategoriesAmountList/CategoriesAmountList";

interface ExpensesAmountProps {
  handleClick: (currentStep: steps, nextStep: steps) => void;
}
const ExpensesAmount: React.FC<ExpensesAmountProps> = ({ handleClick }) => {
  const state = useContext(StateContext);
  const button = useRef<HTMLButtonElement>(
    null as unknown as HTMLButtonElement
  );

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
          Set how much money you want to spend on each Expense Category monthly
        </Typography>
        <CategoriesAmountList
          categoryArray={state.user.expenses}
          button={button.current}
        />
      </Stack>
      <Button
        variant="contained"
        ref={button}
        sx={{
          width: "100%",
          marginBottom: "2rem",
          marginTop: "2rem",
        }}
        onClick={() => handleClick("expensesAmount", "incomes")}
      >
        DONE
      </Button>
    </Stack>
  );
};

export default ExpensesAmount;
