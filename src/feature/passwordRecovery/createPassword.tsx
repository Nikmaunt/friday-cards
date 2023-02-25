import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import "./createPassword.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { changePasswordTC } from "./forgotPasswordReducer";
import { SuperButton } from "../../common/superButton/superButton";
import { useAppDispatch } from "../../app/store";
import { Navigate } from "react-router-dom";
import PATH from "../../common/constans/path/path";
import { useSelector } from "react-redux";
import { selectorSetNewPassword } from "./selectors";
export const CreatePassword = () => {
  console.log("Create");
  const isNewPasswordSet = useSelector(selectorSetNewPassword);
  const dispatch = useAppDispatch();

  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>("");

  //отображение пароля при вводе в Input
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  //ввод пароля
  const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  //нажатие на кнопку для отправки нового пароля на сервер
  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (event.key === "Enter") {
      sendNewPassword();
    }
  };

  //отправка нового пароля на сервер
  const sendNewPassword = () => {
    if (password.length < 8) {
      setError("Password length should be more then 8 symbols");
      setPassword("");
    } else {
      dispatch(changePasswordTC(password));
    }
  };
  if (isNewPasswordSet) {
    // return <Navigate to={PATH.LOGIN} />;
    return <Navigate to={PATH.SET_NEW_PASSWORD} />;
  }
  return (
    <div className={"createPassword"}>
      <div className={"title"}>Create new password</div>
      <form>
        <FormControl fullWidth variant="standard" className={"textField"}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={onChangePasswordHandler}
            onKeyDown={onKeyDownHandler}
            error={!!error}
            value={password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {error && <div className="error-message">{error}</div>}
        <div className={"description"}>Create new password and we will send you further instructions to email</div>
        <SuperButton name={"Create new password"} callback={sendNewPassword} />
      </form>
    </div>
  );
};
