import { appAPI } from "../../app/appAPI";
import { AppThunkDispatch } from "../../app/store";
import { AxiosError } from "axios";
import { errorUtils } from "../../utils/errorUtils/errorUtils";
import { setAppStatus } from "../../app/appReducer";

const initialState = {
  isEmailSend: false,
  isNewPasswordSet: false,
};

export const forgotPasswordReducer = (
  state: InitialForgotPasswordStateType = initialState,
  action: ForgotPasswordActionsType
): InitialForgotPasswordStateType => {
  switch (action.type) {
    case ForgotPasswordActionType.IsEmailSend:
      return { ...state, isEmailSend: !state.isEmailSend };
    case ForgotPasswordActionType.SetNewPassword:
      return { ...state, isNewPasswordSet: !state.isNewPasswordSet };
    default:
      return state;
  }
};
////////////////// ACTION CREATORS //////////////////////

export const isEmailSend = () => ({ type: ForgotPasswordActionType.IsEmailSend } as const);

export const setNewPassword = () => ({ type: ForgotPasswordActionType.SetNewPassword } as const);

export const recoveryPasswordTC = (email: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  const payload = {
    email: email,
    from: `test-front-admin <ai73a@yandex.by>`,
    message: `<div style="background-color: lime; padding: 15px"> 
                password recovery link: <a href='http://localhost:3000/friday-cards/set-new-password/$token$'>link</a>
                </div>`,
  };
  try {
    await appAPI.recoveryPassword(payload);
    dispatch(isEmailSend());
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const changePasswordTC = (password: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  //url из строки браузера
  const URL = window.location.href;
  const resetPasswordToken = URL.replace(/^.*[\\\/]/, "");
  const newPassword = {
    password: password,
    resetPasswordToken: resetPasswordToken,
  };
  //токен
  try {
    await appAPI.setNewPassword(newPassword);
    dispatch(setNewPassword());
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

/////////////// types //////////////////////
type InitialForgotPasswordStateType = typeof initialState;

export type ForgotPasswordActionsType = ReturnType<typeof isEmailSend> | ReturnType<typeof setNewPassword>;

const ForgotPasswordActionType = {
  IsEmailSend: "IS-EMAIL-SEND",
  SetNewPassword: "SET-NEW-PASSWORD",
} as const;
