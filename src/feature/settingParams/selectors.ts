import { RootReducerType } from "../../app/store";

export const selectSettingMinValue = (state: RootReducerType) => state.settings.min;
export const selectSettingMaxValue = (state: RootReducerType) => state.settings.max;
