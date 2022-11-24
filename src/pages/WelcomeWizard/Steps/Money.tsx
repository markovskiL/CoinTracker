import { Button, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { steps } from "../WelcomeWizard";

interface MoneyProps {
  handleClick: (currentStep: steps, nextStep: steps) => void;
}
const Money: React.FC<MoneyProps> = ({ handleClick }) => {
  const [moneyValue, setMoneyValue] = useState<number | "" | "0">(""); //This value is currently not used in the application
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  
  useEffect(() => {
    moneyValue === "" || moneyValue > 65000 || moneyValue <= 0
      ? setButtonDisabled(true)
      : setButtonDisabled(false);
  }, [moneyValue]);

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
          How much money do you have at the moment?
        </Typography>
        <TextField
          label="Amount"
          id="filled-start-adornment"
          sx={{ m: 1, width: "100%" }}
          type={"number"}
          value={moneyValue}
          autoFocus
          onChange={(e) => {
            const value = e.target.value;
            setMoneyValue(value !== "" ? +value : "");
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Typography
                  component={"span"}
                  color={"primary"}
                  fontSize={"1.5em"}
                  marginRight={"0.2rem"}
                >
                  |
                </Typography>
                65000
              </InputAdornment>
            ),
          }}
          variant="filled"
        />
      </Stack>

      <Button
        variant="contained"
        sx={{
          width: "100%",
          marginBottom: "2rem",
          marginTop: "1rem",
        }}
        disabled={buttonDisabled}
        onClick={() => handleClick("money", "expenses")}
      >
        ADD
      </Button>
    </Stack>
  );
};

export default Money;
