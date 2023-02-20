import FormatClearIcon from "@mui/icons-material/FormatClear";
import React from "react";
import s from "../SettingParams.module.css";
import { useAppDispatch } from "../../../app/store";
import { fetchPacksTC, setPacksParams } from "../../packs/packsReducer";
export const ClearButton = () => {
  const dispatch = useAppDispatch();

  const clearParams = () => {
    const params = {
      packName: "",
      min: 0,
      max: 110,
      sortPacks: "0updated",
      page: 1,
      pageCount: 4,
      user_id: "",
      block: false,
    };
    //dispatch(setSearchFieldEmpty(true));
    dispatch(setPacksParams(params));
    dispatch(fetchPacksTC());
  };
  return (
    <div onClick={clearParams} className={s.wrapperClearButton}>
      <div>
        {/*<img className={s.imgClearButton} src={clearButton} alt="clear" />*/}
        <FormatClearIcon />
      </div>
    </div>
  );
};
