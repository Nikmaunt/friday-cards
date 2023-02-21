import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import s from "../searchField/SearchField.module.css";
import styles from "./SliderField.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/store";
import { fetchPacksTC, setPacksParams } from "../../packs/packsReducer";
import { selectorMax, selectorMaxxx, selectorMin, selectorMinn } from "../../packs/packsSelectors";

export const SliderField = () => {
  const dispatch = useAppDispatch();

  const minValueParamsCards = useSelector(selectorMin);
  const minValue = useSelector(selectorMinn);
  const maxValueParamsCards = useSelector(selectorMax);
  const maxValue = useSelector(selectorMaxxx);

  useEffect(() => {
    if (minValueParamsCards === 0 && maxValueParamsCards === 0) {
      dispatch(setPacksParams({ min: minValue, max: maxValue }));
      setValue([minValue, maxValue]);
    }
  }, [minValueParamsCards, maxValueParamsCards]);

  const [value, setValue] = useState([minValueParamsCards as number, maxValueParamsCards as number]);

  const handlerChangeCommitted = (event: React.SyntheticEvent | Event, newValue: number | Array<number>) => {
    setValue(newValue as number[]);
    const params = { min: value[0], max: value[1] };
    dispatch(setPacksParams(params));
    dispatch(fetchPacksTC());
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
