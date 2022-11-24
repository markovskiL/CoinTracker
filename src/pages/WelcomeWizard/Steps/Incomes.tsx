import { Stack, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import incomesListJSON from "../../../data/incomes.json";
import { steps } from "../WelcomeWizard";
import CategoriesList, { CategoryProps } from "../CategoriesList/CategoriesList";

const incomesList = incomesListJSON.incomes;
interface IncomesProps {
  handleClick: (
    currentStep: steps,
    nextStep: steps,
    payload: CategoryProps[]
  ) => void;
}
const Incomes: React.FC<IncomesProps> = ({ handleClick }) => {
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
          Choose your incomes
        </Typography>
        <CategoriesList
          categoryArray={incomesList}
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
          handleClick("incomes", "incomesAmount", incomesList);
        }}
      >
        ADD
      </Button>
    </Stack>
  );
};

export default Incomes;
