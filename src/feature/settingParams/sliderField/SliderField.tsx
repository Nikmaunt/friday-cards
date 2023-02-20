import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import s from "../searchField/SearchField.module.css";
import styles from "./SliderField.module.css";
import { useEffect, useState } from "react";
import { restoreState, saveState } from "../../../common/functions/localStorage/localStorage";
import { useSelector } from "react-redux";
import { selectSettingMaxValue, selectSettingMinValue } from "../selectors";
import { getPackTC } from "../settingsReducer";
import { useAppDispatch } from "../../../app/store";
import { fetchPacksTC, setPacksParams } from "../../packs/packsReducer";

export const SliderField = () => {
  console.log("SliderField rrender");
  const dispatch = useAppDispatch();

  const minValueCards = useSelector(selectSettingMinValue);

  const maxValueCards = useSelector(selectSettingMaxValue);

  useEffect(() => {
    !(minValueCards === 0 && maxValueCards === 0) && dispatch(getPackTC({}));
    setValue(restoreState<number[]>("slider", [minValueCards, maxValueCards]));
  }, [minValueCards, maxValueCards]);

  const [value, setValue] = useState(restoreState<number[]>("slider", [minValueCards, maxValueCards]));

  const handlerChangeCommitted = (event: React.SyntheticEvent | Event, newValue: number | Array<number>) => {
    setValue(newValue as number[]);
    saveState<number[]>("slider", [value[0], value[1]]);
    const params = { min: value[0], max: value[1] };
    dispatch(setPacksParams(params));
    dispatch(fetchPacksTC());
  };
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
