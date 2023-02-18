import { AppThunkDispatch } from "../../app/store";
import { setAppStatus } from "../../app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "../../utils/errorUtils/errorUtils";
import { AddPackParamsType, EditCardPackRequestType, GetPacksParamsType, PackReturnType, packsAPI } from "./packsAPI";

export const packsReducer = (
  state: PacksResponseType = initialPacksState,
  action: PacksActionCreatorsType
): PacksResponseType => {
  switch (action.type) {
    case PacksActions.SetPacks:
      return { ...state, ...action.payload.packs };
    default:
      return state;
  }
};

/////////////////// ACTION CREATORS ///////////////////////
export const setPacksAC = (packs: GetPacksParamsType) => {
  return { type: PacksActions.SetPacks, payload: { packs } as const };
};

/////////////////// THUNK CREATORS ////////////////////////
export const fetchPacksTC = (params: GetPacksParamsType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
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
    const res = await packsAPI.addPack(newPack);
    console.log("add packs res", res);
    dispatch(fetchPacksTC({}));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    //dispatch(setAppStatus("succeeded"));
  }
};

export const deletePackTC = (id: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    const res = await packsAPI.deletePack(id);
    await dispatch(fetchPacksTC({}));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const editPackTC = (id: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  const editCardPack: EditCardPackRequestType = {
    cardsPack: {
      _id: id,
      name: "EDIT PACK",
    },
  };
  try {
    const res = await packsAPI.editPack(editCardPack);
    await dispatch(fetchPacksTC({}));
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
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};

const initialPacksState = {
  cardPacks: [],
  page: 0,
  pageCount: 4,
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 0,
  token: "",
  tokenDeathTime: 0,
};

export const PacksActions = {
  SetPacks: "SET-PACKS",
  AddPack: "ADD-PACK",
  SetPackId: "SET-PACK-ID",
} as const;

export type PacksActionCreatorsType = ReturnType<typeof setPacksAC>;
