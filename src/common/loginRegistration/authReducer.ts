import { AppThunkDispatch } from "../../app/store";
import { authAPI, LoginRequestType, RegistrationRequestType } from "./authAPI";
import { setAppStatus, setIsInitialized, toggleIsSignUp } from "../../app/appReducer";

const initialAuthState = {
  isLogin: false,
};

export const authReducer = (state = initialAuthState, action: AuthActionCreatorsType): InitialAuthStateType => {
  switch (action.type) {
    case AuthActions.SetAuthUser:
      return { ...state, isLogin: action.payload.value };
    default:
      return state;
  }
};
/////////////////// ACTION CREATORS ///////////////////////
export const setLoginUser = (value: boolean) => ({ type: AuthActions.SetAuthUser, payload: { value } } as const);

/////////////////// THUNK CREATORS ////////////////////////
export const registrationUser = (values: RegistrationRequestType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    let res = await authAPI.registration(values);
    dispatch(toggleIsSignUp(false));
    dispatch(setAppStatus("succeeded"));
    console.log(res);
  } catch (e) {}
};

export const loginUser = (values: LoginRequestType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    let res = await authAPI.login(values);
    console.log(res);
    //dispatch(toggleIsSignUp());

    dispatch(setAppStatus("succeeded"));

    dispatch(setLoginUser(true));
  } catch (e) {}
};

export const authMe = () => async (dispatch: AppThunkDispatch) => {
  try {
    let res = await authAPI.authMe();
    console.log(res);
    dispatch(setLoginUser(true));
  } catch (err) {
  } finally {
    dispatch(setIsInitialized(true));
  }
};

//////////// types //////////////

type InitialAuthStateType = typeof initialAuthState;

export enum AuthActions {
  SetAuthUser = "SET-AUTH-USER",
}

export type AuthActionCreatorsType = ReturnType<typeof setLoginUser>;
