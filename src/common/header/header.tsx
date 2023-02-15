import * as React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { SuperButton } from "../superButton/superButton";
import { useAppDispatch, useAppSelector } from "../../app/store";
import Avatar from "@mui/material/Avatar";
import { Stack, Tooltip } from "@mui/material";
import userPhoto from "../../feature/profile/img/userPhoto.png";
import { toggleIsSignUp } from "../../app/appReducer";

export const Header = () => {
  const userName = useAppSelector<string>((state) => state.auth.user.name);
  const isLogin = useAppSelector<boolean>((state) => state.auth.isLogin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const goToSignIn = () => {
    dispatch(toggleIsSignUp(false));
    return navigate("/friday-cards/login");
  };

  return (
    <div className={"topnav"}>
      <img
        className={"main_logo"}
        src="https://static.tildacdn.com/tild3064-6361-4562-a539-303563643237/logo-big-blue.png"
        alt="header_logo"
      />
      <div>
        {isLogin ? (
          <Stack className={"userProfile"} direction="row" spacing={1}>
            <h4 style={{ color: "black" }}>{userName}</h4>
            <Avatar style={{ marginTop: "12px" }} alt="userName" src={userPhoto} sx={{ width: 36, height: 36 }} />
          </Stack>
        ) : (
          <div className={"button"}>
            <SuperButton name={"Sign in"} callback={goToSignIn} />
          </div>
        )}
      </div>
    </div>
  );
};
