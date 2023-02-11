import { RootReducerType } from "../../app/store";

export const selectorEmailSend = (state: RootReducerType) => state.recoveryPassword.isEmailSend;
export const selectorSetNewPassword = (state: RootReducerType) => state.recoveryPassword.isNewPasswordSet;
