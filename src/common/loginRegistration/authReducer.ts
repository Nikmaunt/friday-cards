import { AppThunkDispatch } from "../../app/store";
import { authAPI, LoginRequestType, RegistrationRequestType, UserType } from "./authAPI";
import { setAppStatus, setIsInitialized, toggleIsSignUp } from "../../app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "../../utils/errorUtils/errorUtils";

const initialAuthState = {
  isLogin: false,
  user: {}
};

export const authReducer = (state = initialAuthState, action: AuthActionCreatorsType): InitialAuthStateType => {
  switch (action.type) {
    case AuthActions.SetAuthUser:
      return { ...state, isLogin: action.payload.value};
    case AuthActions.SetCurrentUser:
      return { ...state, user: action.payload.user };
    default:
      return state;
    //
  }
};
/////////////////// ACTION CREATORS ///////////////////////
export const setLoginUser = (value: boolean,data?:UserDataType) => ({ type: AuthActions.SetAuthUser, payload: { value,data } } as const);
export const setCurrentUser = (user:UserType) => ({ type: AuthActions.SetCurrentUser, payload: { user } } as const);

// actions

export const setIsLoggedINAC = (value: boolean,data?:UserDataType) => ({type: 'SET-IS-LOGGED-IN', value,data} as const)

/////////////////// THUNK CREATORS ////////////////////////
export const registrationUser = (values: RegistrationRequestType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    await authAPI.registration(values);
    dispatch(toggleIsSignUp(false));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const loginUser = (values: LoginRequestType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    await authAPI.login(values);
      let res = await authAPI.login(values);
     dispatch(setLoginUser(true));
     dispatch(setCurrentUser(res.data))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const authMe = () => async (dispatch: AppThunkDispatch) => {
  try {
    await authAPI.authMe();
    dispatch(setLoginUser(true));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setIsInitialized(true));
  }
};

export const logoutUser = () => (dispatch: AppThunkDispatch) => {
    authAPI.logout()
        .then(res => {
            if (res.status === 200) {
                dispatch(setLoginUser(false))
            }
        })
        .catch((error) => {
            console.log(error);
        })
}


//////////// types //////////////

type InitialAuthStateType = typeof initialAuthState;

export enum AuthActions {
  SetAuthUser = "SET-AUTH-USER",
  SetCurrentUser = "SET-CURRENT-USER",
}

export type AuthActionCreatorsType = ReturnType<typeof setLoginUser> | ReturnType<typeof setCurrentUser>;

export type UserDataType =  {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
// количество колод

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;
}


type ActionsType =
    | ReturnType<typeof setIsLoggedINAC>
