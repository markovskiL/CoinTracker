import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputAdornment, InputLabel, ListItemIcon, ListItemText, MenuItem, OutlinedInput, Select, Stack, TextField,} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DispatchContext, StateContext } from "../../contexts/UserDataContext";
import AutoComplete, { autocompleteOptionProps } from "../AutoComplete/AutoComplete";
import MuiIcon, { MuiIconType } from "../MuiIcon/MuiIcon";
import { auth } from "../../firebase-config";
import { generateUniqueId } from "../../helpers/generateUniqueId";
import { CategoryProps } from "../../pages/WelcomeWizard/CategoriesList/CategoriesList";

interface props {
  actionType: "ADD" | { type: "UPDATE"; updatingCategory: CategoryProps };
  handleClose: () => void;
  iconNames: string[];
}

const CategoryModal: React.FC<props> = ({
  actionType,
  handleClose,
  iconNames,
}) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const userId = auth.currentUser?.uid;

  const updatingCategory = actionType !== "ADD" ? actionType.updatingCategory : null;

  const types = [
    { id: "Expense", name: "Expense" },
    { id: "Income", name: "Income" },
  ];

  const [typeValue, setTypeValue] = useState<autocompleteOptionProps | null>(
    updatingCategory?.type === "Expense"
      ? { id: "Expense", name: "Expense" }
      : updatingCategory?.type === "Income"
      ? { id: "Income", name: "Income" }
      : null
  );

  const [inputTypeValue, setInputTypeValue] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>(updatingCategory?.category_name || "");
  const [icon, setIcon] = useState<string>(updatingCategory?.icon_name || "");
  const [budget, setBudget] = useState<number | "">( updatingCategory?.expected_amount || "" );
  const [enabled, setEnabled] = useState<boolean>( updatingCategory?.is_selected === false ? false : true );
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleAdd = () => {
    if (userId) {
      const newCategory = {
        id: generateUniqueId(),
        category_name: categoryName,
        type: typeValue?.name,
        expected_amount: budget || 0,
        current_amount: 0,
        icon_name: icon,
        is_selected: enabled,
      };
      if (typeValue?.name === "Expense") {
        dispatch({ type: "ADD-EXPENSE-CATEGORY", payload: newCategory });
      } else if (typeValue?.name === "Income") {
        dispatch({ type: "ADD-INCOME-CATEGORY", payload: newCategory });
      }
      dispatch({ type: "INCREMENT-CATEGORIES-COUNT" });
      dispatch({ type: "TOGGLE-CATEGORY-MODAL" });
    }
  };

  const handleUpdate = () => {
    if (updatingCategory && userId) {
      if (typeValue && categoryName && icon) {
        updatingCategory.type = typeValue.name;
        updatingCategory.category_name = categoryName;
        updatingCategory.icon_name = icon;
        updatingCategory.expected_amount = budget || 0;
        updatingCategory.is_selected = enabled;
        state.user.entries.map((entry) => {
          if (entry.category_id === updatingCategory.id) {
            entry.icon_name = icon;
            return entry;
          } else {
            return entry;
          }
        });
      }
    }
    handleClose();
    dispatch({ type: "UPDATING-CATEGORY-FINISHED" });
  };

  useEffect(() => {
    if (typeValue && categoryName && icon) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [typeValue, categoryName, icon]);

  return (
    <Box>
      <Dialog open={true} onClose={handleClose} fullWidth>
        <DialogTitle>
          {actionType === "ADD" ? "Add New Category" : "Update Category"}
        </DialogTitle>
        <DialogContent>
          <Stack marginTop={"1rem"} gap={"1.5rem"}>
            <AutoComplete
              label="Type"
              options={types}
              value={typeValue}
              setValue={setTypeValue}
              inputValue={inputTypeValue}
              setInputValue={setInputTypeValue}
              noOptionsText={"No options found"}
            />
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              type={"text"}
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />

            <FormControl>
              <InputLabel
                id="demo-multiple-name-label"
                sx={{ display: "flex" }}
              >
                <Box fontSize={"1.3em"} marginRight={"0.5rem"}>
                  <MuiIcon iconName={"Favorite"} />
                </Box>
                {`Icon`}
              </InputLabel>
              <Select
                sx={{ display: "flex" }}
                MenuProps={MenuProps}
                label={"Icon/////"}
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              >
                {iconNames.map((icon) => (
                  <MenuItem value={icon}>
                    <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
                      <ListItemIcon
                        sx={{ minWidth: "fit-content", fontSize: "1.3em" }}
                      >
                        <MuiIcon iconName={icon as MuiIconType} />
                      </ListItemIcon>
                      <ListItemText primary={icon} sx={{ flexGrow: 1 }} />
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              id="outlined-basic"
              label="Budget"
              variant="outlined"
              type={"number"}
              value={budget}
              onChange={(e) =>
                setBudget(e.target.value ? Math.abs(+e.target.value) : "")
              }
            />

            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Enabled
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={"disabled"}
                disabled={true}
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <Checkbox
                      checked={enabled}
                      onChange={() => setEnabled(!enabled)}
                    />
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
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
            disabled={disabledBtn}
          >
            {actionType === "ADD" ? "Add" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryModal;
