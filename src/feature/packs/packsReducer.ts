import {
  AuthActionCreatorsType,
  AuthActions,
  setCurrentUser,
  setLoginUser,
  updateName,
  UserDataType,
} from "../../common/loginRegistration/authReducer";
import { authAPI, RegistrationRequestType } from "../../common/loginRegistration/authAPI";
import { AppThunkDispatch } from "../../app/store";
import { setAppStatus, toggleIsSignUp } from "../../app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "../../utils/errorUtils/errorUtils";
import { PackReturnType, packsAPI, PacksReturnType } from "./packsAPI";

export type PackType = {
  _id: string;
  user_id: string;
  name: string;
  cardsCount: number;
  created: string;
  updated: string;
};

// const initialPacksState = {
//   cardPacks: [
//     {
//       _id: "",
//       user_id: "",
//       name: "",
//       cardsCount: 0,
//       created: "",
//       updated: "",
//     },
//   ],
//   // cardPacksTotalCount: 0,
//   // maxCardsCount: 10,
//   // minCardsCount: 0,
//   // page: 1, // выбранная страница
//   // pageCount: 5,
//   // // количество элементов на странице
// };

const initialPacksState: Array<PackReturnType> = [];

type InitialPacksStateType = typeof initialPacksState;

export const PacksActions = {
  SetPacks: "SET-PACKS",
};

export type PacksActionCreatorsType = ReturnType<typeof setPacksAC>;

export const packsReducer = (state = initialPacksState, action: PacksActionCreatorsType): InitialPacksStateType => {
  switch (action.type) {
    case PacksActions.SetPacks:
      let stateCopy = { ...state };
      console.log("action.packs:", action.packs);
      stateCopy = action.packs;
      return stateCopy;

    default:
      return state;
    //
  }
};

/////////////////// ACTION CREATORS ///////////////////////
export const setPacksAC = (packs: any) => {
  return { type: PacksActions.SetPacks, packs };
};

/////////////////// THUNK CREATORS ////////////////////////
export const fetchPacksTC = () => async (dispatch: AppThunkDispatch) => {
  console.log("fetch");
  dispatch(setAppStatus("loading"));
  try {
    const user_id = "63e137551fb965db809ec8c5";
    const res = await packsAPI.getPacks();
    console.log(res);
    // dispatch(toggleIsSignUp(false));
    dispatch(setPacksAC(res.data.cardPacks));
    console.log("res.data:", res.data);
    console.log("res.data.cardPacks:", res.data.cardPacks);
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};
