import { AppThunkDispatch } from "../../app/store";
import { authAPI, LoginRequestType, RegistrationRequestType } from "./authAPI";

const initialAuthState = {
  isAuth: false,
};

export const authReducer = (state = initialAuthState, action: any): InitialAuthStateType => {
  switch (action.type) {
    default:
      return state;
    //
  }
};

/////////////////// THUNK CREATORS ////////////////////////
export const registrateUser = (values: RegistrationRequestType) => async (dispatch: AppThunkDispatch) => {
  try {
    let res = await authAPI.registration(values);
    console.log(res);
  } catch (e) {}
};

export const loginUser = (values: LoginRequestType) => async (dispatch: AppThunkDispatch) => {
  try {
    let res = await authAPI.login(values);
    console.log(res);
  } catch (e) {}
};

//////////// types //////////////

export type InitialAuthStateType = {
  isAuth: boolean;
};
