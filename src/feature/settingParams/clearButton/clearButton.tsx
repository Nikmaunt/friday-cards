import FormatClearIcon from "@mui/icons-material/FormatClear";
import React from "react";
import s from "../SettingParams.module.css";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../app/store";
import { setIsActiveMyPacks, setPacksParams, setSearchFieldEmpty } from "../../packs/packsReducer";
import { useSelector } from "react-redux";
import { selectorMax } from "../../packs/packsSelectors";

export const ClearButton = () => {
  const dispatch = useAppDispatch();
  const maxValue = useSelector(selectorMax);

  let [searchParams, setSearchParams] = useSearchParams();

  const clearParams = () => {
    const params = {
      packName: "",
      sortPacks: "0updated",
      min: 0,
      max: maxValue,
      page: 1,
      pageCount: 4,
      user_id: "",
      block: false,
    };
    dispatch(setSearchFieldEmpty(true));
    dispatch(setIsActiveMyPacks(false));
    dispatch(setPacksParams(params));
  };
  return (
    <div onClick={clearParams} className={s.wrapperClearButton}>
      <div>
        <FormatClearIcon />
      </div>
    </div>
  );
};
