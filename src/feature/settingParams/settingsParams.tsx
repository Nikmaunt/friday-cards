import { SearchField } from "./searchField/searchField";
import s from "./SettingParams.module.css";
import { GroupButtons } from "./buttonGroup/buttonGroup";
import { SliderField } from "./sliderField/SliderField";

export const SettingsParams = () => {
  return (
    <div>
      <div className={s.wrapper}>
        <SearchField />
        <GroupButtons />
        <SliderField />
      </div>
      <div>Result Test </div>
    </div>
  );
};