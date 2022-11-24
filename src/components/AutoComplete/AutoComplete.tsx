import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export interface autocompleteOptionProps {
  id: string;
  name: string;
}
interface props {
  label: string;
  options: autocompleteOptionProps[];
  value: autocompleteOptionProps | null;
  setValue: (e: any) => void;
  inputValue: string;
  setInputValue: (e: any) => void;
  noOptionsText: string;
}
const AutoComplete: React.FC<props> = ({
  label,
  options,
  value,
  setValue,
  inputValue,
  setInputValue,
  noOptionsText,
}) => {
  return (
    <Autocomplete
      value={value}
      sx={{ width: "100%" }}
      onChange={(event: any, newValue: autocompleteOptionProps | null) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={options}
      renderInput={(params) => <TextField {...params} label={label} />}
      getOptionLabel={(option) => option.name}
      noOptionsText={noOptionsText}
    />
  );
};

export default AutoComplete;
