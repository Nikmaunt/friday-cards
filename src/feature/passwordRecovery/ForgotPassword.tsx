import React from "react";
import { TextField } from "@mui/material";
import "./forgotPassword.css";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootReducerType } from "../../app/store";
import { Action } from "redux";
import { recoveryPasswordTC } from "../../state/forgotPassword-reducer";
import { SuperButton } from "../../common/superButton/superButton";
import { NavLink } from "react-router-dom";

export type AppThunkType = ThunkDispatch<RootReducerType, void, Action>;

export const ForgotPassword = () => {
  // let dispatch = useDispatch<AppThunkType>();
  let dispatch = useDispatch<AppThunkType>();

  //отправка инструкции восстановления пароля на email
  const sendRecoveryPasswordInstructions = () => {
    const email = "vladimir817vk@gmail.com";
    dispatch(recoveryPasswordTC(email));
  };

  return (
    <div className={"forgotPassword"}>
      <div className={"title"}>Forgot your password?</div>
      <TextField label="Email" variant="standard" className={"textField"} />
      <div className={"description"}>Enter your email address and we will send you further instructions</div>
      <SuperButton name={"Send Instructions"} callback={sendRecoveryPasswordInstructions} />
      <div className={"rememberPassword"}>Did you remember your password?</div>
      <div className={"link"}>
        <NavLink className={"linkTry"} to="/friday-cards/login">
          Try logging in
        </NavLink>
      </div>
    </div>
  );
};
