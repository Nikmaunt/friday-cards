import { AppThunkDispatch } from "../../app/store";
import { setAppStatus, toggleIsSignUp } from "../../app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "../../utils/errorUtils/errorUtils";
import { PackReturnType, packsAPI } from "./packsAPI";

export type PackType = {
  _id: string;
  user_id: string;
  name: string;
  cardsCount: number;
  created: string;
  updated: string;
};

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

const initialPacksState: PacksResponseType = {
  cardPacks: [],
  page: 1,
  pageCount: 10,
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 0,
  token: "",
  tokenDeathTime: 0,
};

export const PacksActions = {
  SetPacks: "SET-PACKS",
};

export type PacksActionCreatorsType = ReturnType<typeof setPacksAC>;

export const packsReducer = (state = initialPacksState, action: PacksActionCreatorsType): PacksResponseType => {
  switch (action.type) {
    case PacksActions.SetPacks:
      let stateCopy = { ...state };
      console.log("action.packs:", action.packs);
      stateCopy = action.packs;
      return stateCopy;

    default:
      return state;
  }
};

/////////////////// ACTION CREATORS ///////////////////////
export const setPacksAC = (packs: PacksResponseType) => {
  return { type: PacksActions.SetPacks, packs };
};

/////////////////// THUNK CREATORS ////////////////////////
export const fetchPacksTC = () => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    const res = await packsAPI.getPacks();
    dispatch(setPacksAC(res.data));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};
