import {
  DispatchContext,
  userDataProps,
} from "../../contexts/UserDataContext";
import React, { useContext, useState } from "react";
import { Stack, Typography } from "@mui/material";

import { CategoryProps } from "./CategoriesList/CategoriesList";
import Expenses from "./Steps/Expenses";
import ExpensesAmount from "./Steps/ExpensesAmount";
import Incomes from "./Steps/Incomes";
import IncomesAmount from "./Steps/IncomesAmount";
import Money from "./Steps/Money";

export type steps =
  | "money"
  | "expenses"
  | "expensesAmount"
  | "incomes"
  | "incomesAmount"
  | "overview";

const WelcomeWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<steps>("money");
  const dispatch = useContext(DispatchContext);

  const handleClick = (
    currentStep: steps,
    nextStep: steps,
    payload?: CategoryProps[] | userDataProps
  ) => {
    switch (currentStep) {
      case "expenses": {
        dispatch({
          type: "UPDATE-EXPENSES",
          payload: payload,
        });
        break;
      }
      case "incomes": {
        dispatch({
          type: "UPDATE-INCOMES",
          payload: payload,
        });
        break;
      }
    }
    setCurrentStep(nextStep);
  };

  return (
    <Stack
      sx={{
        height: "100%",
        width: "100%",
        maxWidth: "700px",
      }}
    >
      <Typography
        variant="h5"
        component={"h2"}
        sx={{
          letterSpacing: "5px",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        WELCOME
      </Typography>
      {(() => {
        switch (currentStep) {
          case "money":
            return <Money handleClick={handleClick} />;
          case "expenses":
            return <Expenses handleClick={handleClick} />;
          case "expensesAmount":
            return <ExpensesAmount handleClick={handleClick} />;
          case "incomes":
            return <Incomes handleClick={handleClick} />;
          case "incomesAmount":
            return <IncomesAmount />;
        }
      })()}
    </Stack>
  );
};

export default WelcomeWizard;
