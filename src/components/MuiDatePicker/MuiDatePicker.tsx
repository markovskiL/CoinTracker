import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";

interface props {
  date: Date | null;
  setDate: (date: Date | null) => void;
  onError: (prop: boolean) => void;
}

const MuiDatePicker: React.FC<props> = ({ date, setDate, onError }) => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

  return (
    <DatePicker
      value={date}
      renderInput={(params) => <TextField {...params} />}
      onChange={(newValue) => setDate(newValue)}
      inputFormat="dd-MM-yyyy"
      onError={(value) => onError(!!value)}
      maxDate={now}
      minDate={firstDay}
    />
  );
};

export default MuiDatePicker;
