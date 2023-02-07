import React, { ChangeEvent, useState } from "react";
import { Button, Input, TextField } from "@mui/material";
import "./forgotPassword.css";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootReducerType } from "../../app/store";
import { Action } from "redux";
import { recoveryPasswordTC } from "../../state/forgotPassword-reducer";

export type AppThunkType = ThunkDispatch<RootReducerType, void, Action>;

//
export const ForgotPassword = () => {
  let dispatch = useDispatch<AppThunkType>();
  const [email, setEmail] = useState("");

  //ввод email
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  //отправка инструкции восстановления пароля на email
  const sendRecoveryPasswordInstructions = () => {
    //проверка корректности email
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      alert("Invalid email address");
    } else {
      dispatch(recoveryPasswordTC(email));
    }
  };

  return (
    <div className={"forgotPassword"}>
      <div className={"title"}>Forgot your password?</div>
      <TextField label="Email" variant="standard" className={"textField"} onChange={onChangeHandler} />
      <div className={"description"}>Enter your email address and we will send you further instructions</div>
      <Button className={"button"} variant={"contained"} onClick={sendRecoveryPasswordInstructions}>
        Send Instructions
      </Button>
      <div className={"rememberPassword"}>Did you remember your password?</div>
      <div className={"link"}>Try logging in</div>
    </div>
  );
};
