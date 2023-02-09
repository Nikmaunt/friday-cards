import * as React from 'react';
import s from "./Header.module.css";
import Avatar from '@mui/material/Avatar';
import {Stack} from "@mui/material";
import {Navigate} from "react-router-dom";
import userPhoto from '../../feature/profile/img/userPhoto.png';
import {useAppSelector} from "../../app/store";
import {SuperButton} from "../superButton/superButton";

export const  Header = () => {
  const userName = useAppSelector<string>((state) => state.profile.name)
  const isLogin = useAppSelector<boolean>((state) => state.auth.isLogin);
  const goToSignIn = () => {
    return <Navigate to={"/friday-cards/login"} />;
  };
  return (
      <div className={s.topnav}>
          <img className={s.main_logo} src="https://static.tildacdn.com/tild3064-6361-4562-a539-303563643237/logo-big-blue.png" alt="header_logo"/>
          <div >
              {isLogin ?  <Stack className={s.userProfile}  direction="row" spacing={1}>
                  <h4 style={{color:'black'}}  >{userName}</h4>
                  <Avatar style={{marginTop:'12px'}}
                          alt="userName"
                          src={userPhoto}
                          sx={{ width: 36, height: 36}}
                  />
              </Stack> :<div className={s.button} >
                  <SuperButton  name={"Sign in"} callback={goToSignIn} />
              </div> }
          </div>
      </div>
  );
}
