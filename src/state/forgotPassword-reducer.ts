import React, { Dispatch } from "react";
import { AppThunk } from "../app/store";
import { appAPI } from "../app/appAPI";

type RecoveryPasswordActionType = {
  type: "PASSWORD-RECOVERY";
  message: string;
};

type ChangePasswordActionType = {
  type: "PASSWORD-CHANGE";
  message: string;
};

const initialState = {};
type initialForgotPasswordStateType = typeof initialState;

export type ForgotPasswordActionsType = RecoveryPasswordActionType | ChangePasswordActionType;

export const forgotPasswordReducer = (
  state: initialForgotPasswordStateType = initialState,
  action: ForgotPasswordActionsType
): initialForgotPasswordStateType => {
  switch (action.type) {
    case "PASSWORD-RECOVERY": {
      console.log(action.message);
      alert(action.message);
      return state;
    }
    case "PASSWORD-CHANGE": {
      alert(action.message);
      return state;
    }
    default:
      return state;
  }
};

export const recoveryPasswordAC = (message: string): RecoveryPasswordActionType => {
  return { type: "PASSWORD-RECOVERY", message };
};

export const changePasswordAC = (message: string): ChangePasswordActionType => {
  return { type: "PASSWORD-CHANGE", message };
};

export const recoveryPasswordTC =
  (email: string): AppThunk =>
  async (dispatch) => {
    const res = await appAPI.recoveryPassword(email);
    console.log(res);
    if (!res.data.error) {
      dispatch(recoveryPasswordAC(res.data.info));
    } else {
      dispatch(recoveryPasswordAC(res.data.error));
      throw new Error(res.data.error);
    }
  };

export const changePasswordTC =
  (password: string): AppThunk =>
  async (dispatch) => {
    const resetPasswordToken = "resetPasswordToken";
    const res = await appAPI.setNewPassword(password, resetPasswordToken);
    if (!res.data.error) {
      dispatch(changePasswordAC(res.data.info));
    } else {
      dispatch(changePasswordAC(res.data.error));
      throw new Error(res.data.error);
    }
  };
