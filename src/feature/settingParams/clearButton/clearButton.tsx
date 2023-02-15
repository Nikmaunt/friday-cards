import clearButton from "../../../img/CearButton.svg";
import React from "react";
import s from "../SettingParams.module.css";
export const ClearButton = () => {
  return (
    <div className={s.wrapperClearButton}>
      <div>
        <img className={s.imgClearButton} src={clearButton} alt="clear" />
      </div>
    </div>
  );
};
