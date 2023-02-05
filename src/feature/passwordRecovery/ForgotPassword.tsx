import React, { ChangeEvent } from "react";
import { Button, Input, TextField } from "@mui/material";
import "./forgotPassword.css";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootReducerType } from "../../app/store";
import { Action } from "redux";
import { recoveryPasswordTC } from "../../state/forgotPassword-reducer";

export type AppThunkType = ThunkDispatch<RootReducerType, void, Action>;

export const ForgotPassword = () => {
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
      <Button className={"button"} variant={"contained"} onClick={sendRecoveryPasswordInstructions}>
        Send Instructions
      </Button>
      <div className={"rememberPassword"}>Did you remember your password?</div>
      <div className={"link"}>Try logging in</div>
    </div>
  );
};
