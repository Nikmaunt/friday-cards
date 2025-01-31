import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import s from "../searchField/SearchField.module.css";
import styles from "./SliderField.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectorIsClearSearchField, selectorMax, selectorMin } from "../../packs/packsSelectors";
import { useSearchParams } from "react-router-dom";

export const SliderField = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const URLParams = Object.fromEntries(searchParams);
  const isClearField = useSelector(selectorIsClearSearchField);
  const minValue = useSelector(selectorMin);
  const maxValue = useSelector(selectorMax);

  useEffect(() => {
    setValue([Number(searchParams.get("min")) || minValue, Number(searchParams.get("max")) || maxValue]);
  }, [isClearField, minValue, maxValue]);

  const [value, setValue] = useState([
    Number(searchParams.get("min")) || minValue,
    Number(searchParams.get("max")) || maxValue,
  ]);

  const handlerChangeCommitted = (event: React.SyntheticEvent | Event, newValue: number | Array<number>) => {
    setValue(newValue as number[]);
    const params = { ...URLParams, min: String(value[0]), max: String(value[1]) };
    setSearchParams(params);
  };
  const handlerChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div>
      <h2 className={s.title}>Number of cards</h2>
      <div className={styles.sliderWrapper}>
        <div className={styles.numberWrapper}>
          <div className={styles.spanNumber}>{value[0]}</div>
        </div>
        <Box sx={{ width: 155 }}>
          <Slider
            value={value}
            onChange={handlerChange}
            onChangeCommitted={handlerChangeCommitted}
            valueLabelDisplay="auto"
          />
        </Box>
        <div className={styles.numberWrapper}>
          <span className={styles.spanNumber}>{value[1]}</span>
        </div>
      </div>
    </div>
  );
};
