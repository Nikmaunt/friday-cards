import { AppThunkDispatch } from "../../app/store";

import { ParamsRequestType, settingsAPI } from "./settingsAPI";

const initialSettingsState = {
  packName: "",
  min: 0,
  max: 0,
  sortPacks: "",
  page: 0,
  pageCount: 0,
  user_id: 0,
  block: false,
};
export const settingsReducer = (
  state: InitialSettingsStateType = initialSettingsState,
  action: InitialSettingsActionsType
): InitialSettingsStateType => {
  switch (action.type) {
    case settingsValue.SET_MIN_CARDS_VALUE:
      return { ...state, min: action.payload.value };
    case settingsValue.SET_MAX_CARDS_VALUE:
      return { ...state, max: action.payload.value };
    default:
      return state;
  }
};
/////////////  ACTIONS CREATOR /////////////
export const setMinCardsValue = (value: number) =>
  ({
    type: settingsValue.SET_MIN_CARDS_VALUE,
    payload: { value },
  } as const);
export const setMaxCardsValue = (value: number) =>
  ({
    type: settingsValue.SET_MAX_CARDS_VALUE,
    payload: { value },
  } as const);

export const getPackTC = (params: ParamsRequestType) => async (dispatch: AppThunkDispatch) => {
  try {
    let res = await settingsAPI.getPacks(params);
    console.log(res);
    const { minCardsCount, maxCardsCount } = res.data;
    dispatch(setMinCardsValue(minCardsCount));
    dispatch(setMaxCardsValue(maxCardsCount));
  } catch (e) {}
};

export const createPackTC = () => async (dispatch: AppThunkDispatch) => {
  try {
    let res = await settingsAPI.postPack();
    console.log(res);
  } catch (e) {}
};

type InitialSettingsStateType = typeof initialSettingsState;
export type InitialSettingsActionsType = ReturnType<typeof setMinCardsValue> | ReturnType<typeof setMaxCardsValue>;
export const settingsValue = {
  SET_MIN_CARDS_VALUE: "SET-MIN-CARDS-VALUE",
  SET_MAX_CARDS_VALUE: "SET-MAX-CARDS-VALUE",
} as const;
