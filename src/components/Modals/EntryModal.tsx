import AutoComplete, { autocompleteOptionProps } from "../AutoComplete/AutoComplete";
import { Box, Stack } from "@mui/material";
import { DispatchContext, StateContext } from "../../contexts/UserDataContext";
import React, { useContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MuiDatePicker from "../MuiDatePicker/MuiDatePicker";
import TextField from "@mui/material/TextField";
import { generateUniqueId } from "../../helpers/generateUniqueId";

interface props {
  isMounted: boolean;
  handleClose: () => void;
  type?: "Income" | "Expense" | null;
  action:
    | { type: "ADD"; index: number | null }
    | { type: "UPDATE"; index: number };
}
const EntryModal: React.FC<props> = ({
  isMounted,
  handleClose,
  action,
  type,
}) => {
  const actionType = action.type;
  const entryIndex = action.index;
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const selectedEntry = entryIndex || entryIndex === 0 ? state.user.entries[entryIndex] : undefined;

  const types = [
    { id: "Expense", name: "Expense" },
    { id: "Income", name: "Income" },
  ];

  const incomes = state.user.incomes
    .filter((income) => income.is_selected === true)
    .map((income) => ({
      id: income.id,
      name: income.category_name,
    }));

  const expenses = state.user.expenses
    .filter((expense) => expense.is_selected === true)
    .map((expense) => ({
      id: expense.id,
      name: expense.category_name,
    }));

  const [typeValue, setTypeValue] = useState<autocompleteOptionProps | null>(
    selectedEntry?.entry_type === "Expense" || type === "Expense"
      ? { id: "Expense", name: "Expense" }
      : selectedEntry?.entry_type === "Income" || type === "Income"
      ? { id: "Income", name: "Income" }
      : null
  );

  const [typeChanged, setTypeChanged] = useState<number>(0);

  const [inputTypeValue, setInputTypeValue] = useState<string>("");

  const [categoryValue, setCategoryValue] =
    useState<autocompleteOptionProps | null>(
      selectedEntry?.category_id && selectedEntry.category_name
        ? {
            id: selectedEntry.category_id,
            name: selectedEntry.category_name,
          }
        : null
    );
  const [categoryInputValue, setCategoryInputValue] = useState<string>("");

  const [amount, setAmount] = useState<number | "">(
    selectedEntry?.amount || ""
  );

  const [date, setDate] = useState<Date | null>(
    selectedEntry?.date
      ? new Date(selectedEntry.date.split("/").reverse().join("/"))
      : new Date()
  );
  const [dateError, setDateError] = useState<boolean>(false);

  const [description, setDescription] = useState<string>(
    selectedEntry?.description || ""
  );

  const [addBtnDisabled, setAddBtnDisabled] = useState<boolean>(true);

  const handleSetType = (
    e: React.SetStateAction<autocompleteOptionProps | null>
  ) => {
    setTypeValue(e);
    setTypeChanged((prev) => prev + 1);
  };
  const getIncomeIcon = () => {
    return (
      state.user.incomes.find((income) => income.id === categoryValue?.id)
        ?.icon_name || ""
    );
  };
  const getExpenseIcon = () => {
    return (
      state.user.expenses.find((expense) => expense.id === categoryValue?.id)
        ?.icon_name || ""
    );
  };
  const handleUpdate = () => {
    const icon =
      typeValue?.name === "Expense"
        ? getExpenseIcon()
        : typeValue?.name === "Income"
        ? getIncomeIcon()
        : "";

    const newEntry = {
      id: selectedEntry?.id,
      entry_type: typeValue?.name || "",
      category_id: categoryValue?.id || "",
      category_name: categoryValue?.name || "",
      icon_name: icon,
      date: date?.toLocaleDateString("en-GB") || "",
      amount: +amount,
      description: description,
    };

    dispatch({
      type: "UPDATE-ENTRY",
      payload: {
        updatedEntry: newEntry,
      },
    });
  };
  const handleAdd = () => {
    const icon =
      typeValue?.name === "Expense"
        ? getExpenseIcon()
        : typeValue?.name === "Income"
        ? getIncomeIcon()
        : "";

    const newEntry = {
      id: generateUniqueId(),
      entry_type: typeValue?.name || "",
      category_id: categoryValue?.id || "",
      category_name: categoryValue?.name || "",
      icon_name: icon,
      date: date?.toLocaleDateString("en-GB") || "",
      amount: +amount,
      description: description,
    };

    dispatch({ type: "ENABLE-ADDING-ENTRIES" });
    dispatch({ type: "ADD-ENTRY", payload: newEntry });
    dispatch({ type: "INCREMENT-ENTRIES-COUNT" });
    handleClose();
  };

  useEffect(() => {
    if (typeValue && categoryValue && amount && date && !dateError) {
      setAddBtnDisabled(false);
    } else {
      setAddBtnDisabled(true);
    }
  }, [typeValue, categoryValue, amount, date, dateError]);

  useEffect(() => {
    if (typeChanged > 0) {
      setCategoryValue(null);
    }
  }, [typeChanged]);

  return (
    <Box>
      <Dialog open={isMounted} onClose={handleClose} fullWidth>
        <DialogTitle>
          {actionType === "ADD" ? "Add New Entry" : "Update Entry"}
        </DialogTitle>
        <DialogContent>
          <Stack marginTop={"1rem"} gap={"1.5rem"}>
            <AutoComplete
              label="Type"
              options={types}
              value={typeValue}
              setValue={handleSetType}
              inputValue={inputTypeValue}
              setInputValue={setInputTypeValue}
              noOptionsText={"No options found"}
            />
            <AutoComplete
              label="Category"
              options={
                typeValue?.name === "Income"
                  ? incomes
                  : typeValue?.name === "Expense"
                  ? expenses
                  : []
              }
              value={categoryValue}
              setValue={setCategoryValue}
              inputValue={categoryInputValue}
              setInputValue={setCategoryInputValue}
              noOptionsText={
                !typeValue ? "Please choose a type" : "No options found"
              }
            />
            <TextField
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              type={"number"}
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value ? Math.abs(+e.target.value) : "")
              }
            />
            <MuiDatePicker
              date={date}
              setDate={setDate}
              onError={setDateError}
            />

            <TextField
              id="outlined-basic"
              label="Description (optional)"
              variant="outlined"
              type={"text"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 24px",
          }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={actionType === "ADD" ? handleAdd : handleUpdate}
            variant={"contained"}
            disabled={addBtnDisabled}
          >
            {actionType === "ADD" ? "Add" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default EntryModal;
