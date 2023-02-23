import React from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import s from "./actionModal.module.css";

const currencies = [
  {
    value: "Text",
    label: "Text",
  },
  {
    value: "Img",
    label: "Img",
  },
  {
    value: "Audio",
    label: "Audio",
  },
  {
    value: "Video",
    label: "Video",
  },
];

export const SelectQuestion = () => {
  return (
    <div className={s.selectQuestion}>
      <Box component="form" noValidate autoComplete="off">
        <div className={s.questionFormat}>Choose a question format</div>
        <TextField id="standard-question-format" select defaultValue="Text" className={s.questionFormatInput}>
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </div>
  );
};
