import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import s from "../searchField/SearchField.module.css";
import styles from "./SliderField.module.css";
import { useState } from "react";
import { restoreState } from "../../../common/functions/localStorage/localStorage";

export const SliderField = () => {
  const [value1, setValue1] = useState(restoreState<number>("value1", 0));
  const [value2, setValue2] = useState(restoreState<number>("value2", 100));

  const handlerChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue1(+newValue[0]);
      setValue2(+newValue[1]);
    } else {
      setValue1(+newValue);
    }
  };

  return (
    <div>
      <h2 className={s.title}>Number of cards</h2>
      <div className={styles.sliderWrapper}>
        <div className={styles.numberWrapper}>
          <div className={styles.spanNumber}>{value1}</div>
        </div>
        <Box sx={{ width: 155 }}>
          <Slider value={[value1, value2]} onChange={handlerChange} valueLabelDisplay="auto" />
        </Box>
        <div className={styles.numberWrapper}>
          <span className={styles.spanNumber}>{value2}</span>
        </div>
      </div>
    </div>
  );
};
