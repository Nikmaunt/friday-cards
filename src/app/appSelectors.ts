import { RootReducerType } from "./store";

export const selectAppStatus = (state: RootReducerType) => state.app.status;
export const selectorSignUp = (state: RootReducerType) => state.app.isSignUp;
export const selectorAuth = (state: RootReducerType) => state.app.isAuth;
export const selectorPackId = (state: RootReducerType) => state.app.currentPackId;
export const selectorUserId= (state: RootReducerType) => state.auth.user._id;
