import { RootReducerType } from "../../app/store";

export const selectorLogin = (state: RootReducerType) => state.auth.isLogin;
