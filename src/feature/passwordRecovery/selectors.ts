import { RootReducerType } from "../../app/store";

export const selectorSetNewPassword = (state: RootReducerType) => state.recoveryPassword.isNewPasswordSet;
