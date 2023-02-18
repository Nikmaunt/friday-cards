import { SearchField } from "./searchField/searchField";
import s from "./SettingParams.module.css";
import { GroupButtons } from "./buttonGroup/buttonGroup";
import { SliderField } from "./sliderField/SliderField";
import { ClearButton } from "./clearButton/clearButton";
import { memo } from "react";

export const SettingsParams = memo(() => {
  return (
    <div className={s.wrapper}>
      <SearchField />
      <GroupButtons />
      <SliderField />
      <ClearButton />
    </div>
  );
});
