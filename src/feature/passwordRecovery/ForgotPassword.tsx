import React, { ChangeEvent, useState } from "react";
import { TextField } from "@mui/material";
import "./forgotPassword.css";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { recoveryPasswordTC } from "./forgotPassword-reducer";
import { SuperButton } from "../../common/superButton/superButton";
import { Navigate, NavLink } from "react-router-dom";

export const ForgotPassword = () => {
  const isEmailSend = useAppSelector<boolean>((state) => state.recoveryPassword.isEmailSend);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<null | string>("");
  //ввод email
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    setError("");
  };
  //отправка инструкции восстановления пароля на email
  const sendRecoveryPasswordInstructions = () => {
    //проверка корректности email
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setError("Invalid email address");
    } else {
      dispatch(recoveryPasswordTC(email));
    }
  };
  if (isEmailSend) {
    return <Navigate to={"/friday-cards/check-email"} />;
  }
  return (
    <div className={"forgotPassword"}>
      <div className={"title"}>Forgot your password?</div>
      <TextField label="Email" variant="standard" className={"textField"} onChange={onChangeHandler} fullWidth />
      {error && <div className="error-message">{error}</div>}
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
