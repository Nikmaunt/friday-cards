import s from "./Header.module.css";
import { Navigate, NavLink } from "react-router-dom";
import { SuperButton } from "../superButton/superButton";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { setLoginUser } from "../loginRegistration/authReducer";
import {Stack} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import React, {useEffect} from "react";
import userPhoto from '../../feature/profile/img/userPhoto.png';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {UserDataType} from "../loginRegistration/authReducer";
import {updateUser} from "../../feature/profile/profileReducer";

export const Header = () => {
  const isLogin = useAppSelector<boolean>((state) => state.auth.isLogin);
  const dispatch = useAppDispatch();

  let activeStyle = {
    color: "#0059b2",
  };
  const goToSignIn = () => {
    console.log("bottom");
    return <Navigate to={"/friday-cards/login"} />;
  };
  const logoutHandler = () => {
    dispatch(setLoginUser(false));
  };

  const userData = useAppSelector<UserDataType | undefined>((state) => state.auth.userData)
  const userName = useAppSelector<string>((state) => state.profile.userName)
  const isSignUp = useAppSelector<boolean>((state) => state.auth.isAuth);

  // не понятно как типизировать, оставим так, потом все равно этот header убирать
  // @ts-ignore
  const style = ({ isActive }) => (isActive ? activeStyle : undefined);
   console.log(userData?.name)

  return (
    <div className={s.wrapper}>
      <div className={s.list}>
        <NavLink style={style} to="/friday-cards/login">
          Login
        </NavLink>
        <NavLink style={style} to="/friday-cards/registration">
          Registration
        </NavLink>
        <NavLink style={style} to="/friday-cards/profile">
          Profile
        </NavLink>
        <NavLink style={style} to="/friday-cards/404">
          Page Not Found
        </NavLink>
        <NavLink style={style} to="/friday-cards/password-recovery">
          Password Recovery
        </NavLink>
        <NavLink style={style} to="/friday-cards/new-password">
          New Password
        </NavLink>
        <NavLink style={style} to="/friday-cards/test-components">
          Test Components
        </NavLink>
        <div className={s.button}>
          {isLogin ? (
            <SuperButton name={"Logout"} callback={logoutHandler} />
          ) : (
            <SuperButton name={"Sign in"} callback={goToSignIn} />
          )}
        </div>
        {isSignUp ?  <Stack direction="row" spacing={1}>
          <h4  >{userName}</h4>
          <Avatar style={{marginTop:'12px'}}
                  alt="userName"
                  src={userPhoto}
                  sx={{ width: 36, height: 36}}
          />
        </Stack> :    <div className={s.button}>
          <SuperButton name={"Sign in"} />
        </div> }


      </div>
    </div>
  );
};
