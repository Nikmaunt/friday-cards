import { RootReducerType } from "./store";

export const selectAppStatus = (state: RootReducerType) => state.app.status;
export const selectorAppInitialized = (state: RootReducerType) => state.app.isInitialized;
export const selectorSignUp = (state: RootReducerType) => state.app.isSignUp;
export const selectAppError = (state: RootReducerType) => state.app.error;
