import { AppThunkDispatch } from "../../app/store";
import { setAppStatus } from "../../app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "../../utils/errorUtils/errorUtils";
import { AddPackParamsType, EditCardPackRequestType, GetPacksParamsType, PackReturnType, packsAPI } from "./packsAPI";

export type PacksResponseType = {
  cardPacks: Array<PackReturnType>;
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
  packId: string;
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
  packId: "",
};

export const PacksActions = {
  SetPacks: "SET-PACKS",
  AddPack: "ADD-PACK",
  SetPackId: "SET-PACK-ID",
} as const;

export type PacksActionCreatorsType =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof addPackAC>
  | ReturnType<typeof setPackId>;

export const packsReducer = (
  state: PacksResponseType = initialPacksState,
  action: PacksActionCreatorsType
): PacksResponseType => {
  switch (action.type) {
    case PacksActions.SetPacks:
      return { ...state, ...action.payload.packs };
    case PacksActions.SetPackId:
      return { ...state, packId: action.payload.id };

    //return { ...state, cardPacks: [...action.payload.packs] }; // так правильно. но не работает пока
    // case PacksActions.AddPack:
    //   return { ...state, cardPacks: [action.payload.newPack, ...state.cardPacks] };
    default:
      return state;
  }
  // switch (action.type) {
  //   case PacksActions.SetPacks:
  //     let stateCopy = { ...state };
  //     stateCopy = action.packs;
  //     return stateCopy;
  //
  //
  //   case PacksActions.AddPack:
  //     //@ts-ignore
  //     return [...state, action.newPack];
  //
  //   default:
  //     return state;
  // }
};

/////////////////// ACTION CREATORS ///////////////////////
export const setPacksAC = (packs: GetPacksParamsType) => {
  return { type: PacksActions.SetPacks, payload: { packs } as const };
};

export const addPackAC = (newPack: PackReturnType) => {
  // поменял тип
  // return { type: PacksActions.AddPack, newPack };
  return { type: PacksActions.AddPack, payload: { newPack } as const };
};

export const setPackId = (id: string) => {
  // поменял тип
  // return { type: PacksActions.AddPack, newPack };
  return { type: PacksActions.SetPackId, payload: { id } as const };
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
    console.log("finally");
  }
};

export const addPackTC = (newPack: AddPackParamsType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  debugger;
  try {
    const res = await packsAPI.addPack(newPack);
    await dispatch(fetchPacksTC({}));
    console.log("add packs", res);
    //dispatch(addPackAC(res.data,res.data._id));
    console.log("res.data._id", res.data._id);
    //dispatch(setPacksAC(res.data));
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
    const res = await packsAPI.deletePack(id);
    await dispatch(fetchPacksTC({}));
    console.log("add packs", res);
    //dispatch(addPackAC(res.data));
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
    console.log("add packs", res);
    //dispatch(addPackAC(res.data));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};
// export const fetchPacksTC = (pageCount?: number) => async (dispatch: AppThunkDispatch) => {
//   dispatch(setAppStatus("loading"));
//   try {
//     const res = await packsAPI.getPacks(pageCount);
//     dispatch(setPacksAC(res.data));
//   } catch (e) {
//     const err = e as Error | AxiosError<{ error: string }>;
//     errorUtils(err, dispatch);
//   } finally {
//     dispatch(setAppStatus("succeeded"));
//   }
// };
