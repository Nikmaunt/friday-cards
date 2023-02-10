import { AppThunkDispatch } from "../../app/store";
import { authAPI, LoginRequestType, RegistrationRequestType } from "./authAPI";
import { setAppStatus, setIsInitialized, toggleIsSignUp } from "../../app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "../../utils/errorUtils/errorUtils";
import {profileAPI} from "../../feature/profile/profileAPI";


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
    verified: false, // подтвердил ли почту
    rememberMe: false,
    error: "",
  },
};

export const authReducer = (state = initialAuthState, action: AuthActionCreatorsType): InitialAuthStateType => {
  switch (action.type) {
    case AuthActions.SetAuthUser:
      return { ...state, isLogin: action.payload.value };
    case AuthActions.SetCurrentUser:
      return { ...state, user: { ...action.payload.user } };
    case AuthActions.UpdateUserName:
      return { ...state, user: { ...state.user, name: action.payload.name } };
    default:
      return state;
    //
  }
};
/////////////////// ACTION CREATORS ///////////////////////
export const setLoginUser = (value: boolean, data?: UserDataType) =>
  ({ type: AuthActions.SetAuthUser, payload: { value, data } } as const);
export const setCurrentUser = (user: UserDataType) =>
  ({ type: AuthActions.SetCurrentUser, payload: { user } } as const);

export const updateName = (name: string) => {
  return {
    type: AuthActions.UpdateUserName,
    payload: {
      name,
    },
  } as const;
};

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
    dispatch(setCurrentUser(res.data));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const authMe = () => async (dispatch: AppThunkDispatch) => {
  try {
    let res = await authAPI.authMe();
    dispatch(setCurrentUser(res.data));
    dispatch(setLoginUser(true));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setIsInitialized(true));
  }
};

export const logoutUser = () => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    await authAPI.logout();
    dispatch(setLoginUser(false));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setIsInitialized(true));
    dispatch(setAppStatus("succeeded"));
  }
};

export const updateUser = (name: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    await profileAPI.updateUserName(name);
    dispatch(updateName(name));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setIsInitialized(true));
    dispatch(setAppStatus("succeeded"));
  }
};

//////////// types //////////////

type InitialAuthStateType = typeof initialAuthState;

export enum AuthActions {
  SetAuthUser = "SET-AUTH-USER",
  SetCurrentUser = "SET-CURRENT-USER",
  UpdateUserName = "UPDATE-NAME",
}

export type AuthActionCreatorsType =
  | ReturnType<typeof setLoginUser>
  | ReturnType<typeof setCurrentUser>
  | ReturnType<typeof updateName>;

export type UserDataType = {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  isAdmin: boolean;
  verified: boolean; // подтвердил ли почту
  rememberMe: boolean;
  error: string;
};
