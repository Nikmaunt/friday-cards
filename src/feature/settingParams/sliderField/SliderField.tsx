import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import s from "../searchField/SearchField.module.css";
import styles from "./SliderField.module.css";
import { useState } from "react";
import { restoreState, saveState } from "../../../common/functions/localStorage/localStorage";

export const SliderField = () => {
  const [value, setValue] = useState(restoreState<number[]>("slider", [0, 100]));

  const handlerChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    saveState<number[]>("slider", [value[0], value[1]]);
  };

  return (
    <div>
      <h2 className={s.title}>Number of cards</h2>
      <div className={styles.sliderWrapper}>
        <div className={styles.numberWrapper}>
          <div className={styles.spanNumber}>{value[0]}</div>
        </div>
        <Box sx={{ width: 155 }}>
          <Slider value={value} onChange={handlerChange} valueLabelDisplay="auto" />
        </Box>
        <div className={styles.numberWrapper}>
          <span className={styles.spanNumber}>{value[1]}</span>
        </div>
      </div>
    </div>
  );
};
