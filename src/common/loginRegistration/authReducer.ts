import { AppThunkDispatch } from "../../app/store";
import { authAPI, LoginRequestType, RegistrationRequestType, UserType } from "./authAPI";
import { setAppStatus, setIsInitialized, toggleIsSignUp } from "../../app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "../../utils/errorUtils/errorUtils";

const initialAuthState = {
  isLogin: false,
  user: {
    _id: "",
    email: "",
    name: "",
    avatar: "",
    publicCardPacksCount: 0,
    created: "",
    updated: "",
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: "",
  },
};

export const authReducer = (state = initialAuthState, action: AuthActionCreatorsType): InitialAuthStateType => {
  switch (action.type) {
    case AuthActions.SetAuthUser:
      return { ...state, isLogin: action.payload.value };
    case AuthActions.SetCurrentUser:
      return { ...state };
    default:
      return state;
  }
};
/////////////////// ACTION CREATORS ///////////////////////
export const setLoginUser = (value: boolean) => ({ type: AuthActions.SetAuthUser, payload: { value } } as const);
export const setCurrentUser = (user: UserType) => ({ type: AuthActions.SetCurrentUser, payload: { user } } as const);

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
    dispatch(setLoginUser(true));
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

//////////// types //////////////

type InitialAuthStateType = typeof initialAuthState;

export enum AuthActions {
  SetAuthUser = "SET-AUTH-USER",
  SetCurrentUser = "SET-CURRENT-USER",
}

export type AuthActionCreatorsType = ReturnType<typeof setLoginUser> | ReturnType<typeof setCurrentUser>;
