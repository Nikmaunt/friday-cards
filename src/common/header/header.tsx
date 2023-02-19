import * as React from "react";
import s from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { SuperButton } from "../superButton/superButton";
import { useAppDispatch } from "../../app/store";
import Avatar from "@mui/material/Avatar";
import { Stack } from "@mui/material";
import userPhoto from "../../feature/profile/img/userPhoto.png";
import { toggleIsSignUp } from "../../app/appReducer";
import { useSelector } from "react-redux";
import { selectUserName } from "../../feature/profile/selectors";
import { selectorLogin } from "../../feature/loginRegistration/selectors";
import PATH from "../constans/path/path";
import { selectorAuth } from "../../app/appSelectors";

export const Header = () => {
  const userName = useSelector(selectUserName);
  const isLogin = useSelector(selectorLogin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectorAuth);

  const goToSignIn = () => {
    dispatch(toggleIsSignUp(false));
    return navigate(PATH.LOGIN);
  };

  return (
    <div className={s.topNav}>
      <img
        className={s.mainLogo}
        src="https://static.tildacdn.com/tild3064-6361-4562-a539-303563643237/logo-big-blue.png"
        alt="header_logo"
      />
      <div>
        {isAuth ? (
            <HeaderDropdown/>
        ) : (
          <div className={s.button}>
            <SuperButton name={"Sign in"} callback={goToSignIn} />
          </div>
        )}
      </div>
    </div>
  );
};
