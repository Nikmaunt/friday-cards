import { AppThunkDispatch, RootReducerType } from "../../app/store";
import { setAppStatus } from "../../app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "../../utils/errorUtils/errorUtils";
import { AddPackParamsType, EditCardPackRequestType, PackReturnType, packsAPI, PacksReturnType } from "./packsAPI";

const initialPacksState = {
  cardPacks: [],
  params: {
    packName: "",
    min: 0,
    max: 0,
    sortPacks: "0updated",
    page: 1,
    pageCount: 4,
    user_id: "",
    block: false,
  },
  page: 0,
  pageCount: 4,
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 0,
  token: "",
  tokenDeathTime: 0,
  isClearSearchField: false,
  isActiveMyPacks: false,
};

export const packsReducer = (
  state: PacksResponseType = initialPacksState,
  action: PacksActionCreatorsType
): PacksResponseType => {
  switch (action.type) {
    case PacksActions.SetPacks:
      return { ...state, ...action.payload.packs };
    case PacksActions.SetParams:
      return { ...state, params: { ...state.params, ...action.payload.params } };
    case PacksActions.SetSearchField:
      return { ...state, isClearSearchField: action.payload.value };
    case PacksActions.SetActivePacks:
      return { ...state, isActiveMyPacks: action.payload.value };
    default:
      return state;
  }
};

/////////////////// ACTION CREATORS ///////////////////////
export const setPacksAC = (packs: PacksReturnType) => {
  return { type: PacksActions.SetPacks, payload: { packs } as const };
};
export const setPacksParams = (params: PackParamsType) => {
  return { type: PacksActions.SetParams, payload: { params } as const };
};
export const setSearchFieldEmpty = (value: boolean) => {
  return { type: PacksActions.SetSearchField, payload: { value } as const };
};
export const setIsActiveMyPacks = (value: boolean) => {
  return { type: PacksActions.SetActivePacks, payload: { value } as const };
};

/////////////////// THUNK CREATORS ////////////////////////
export const fetchPacksTC = () => async (dispatch: AppThunkDispatch, getState: () => RootReducerType) => {
  dispatch(setAppStatus("loading"));
  const { params } = getState().packs;
  try {
    const res = await packsAPI.getPacks(params);
    dispatch(setPacksAC(res.data));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const addPackTC = (newPack: AddPackParamsType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    await packsAPI.addPack(newPack);
    dispatch(fetchPacksTC());
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const deletePackTC = (id: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    await packsAPI.deletePack(id);
    await dispatch(fetchPacksTC());
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const editPackTC = (id: string, newName: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  const editCardPack: EditCardPackRequestType = {
    cardsPack: {
      _id: id,
      name: newName,
    },
  };
  try {
    await packsAPI.editPack(editCardPack);
    await dispatch(fetchPacksTC());
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

/////////// types /////////////
export type PacksResponseType = {
  cardPacks: Array<PackReturnType>;
  params: PackParamsType;
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
  isClearSearchField: boolean;
  isActiveMyPacks: boolean;
};

export const PacksActions = {
  SetPacks: "SET-PACKS",
  AddPack: "ADD-PACK",
  SetPackId: "SET-PACK-ID",
  SetParams: "SET_PARAMS",
  SetSearchField: "SET_SEARCH_FIELD",
  SetActivePacks: "SET-ACTIVE-PACKS",
  SetActiveModalPack: "SET-MODAL-PACK",
  ClearMaxMinCardsValue: "CLEAR-MAX-MIN-VALUE",
} as const;

export type PackParamsType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: string;
  block?: boolean;
};
export type PacksActionCreatorsType =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof setPacksParams>
  | ReturnType<typeof setSearchFieldEmpty>
  | ReturnType<typeof setIsActiveMyPacks>;
