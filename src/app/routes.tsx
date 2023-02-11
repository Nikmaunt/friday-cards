import { Route, Routes } from "react-router-dom";
import PATH from "../common/constans/path/path";
import { LoginRegistration } from "../feature/loginRegistration/loginRegistration";
import { Profile } from "../feature/profile/profile";
import { ForgotPassword } from "../feature/passwordRecovery/forgotPassword";
import { CheckEmail } from "../feature/passwordRecovery/checkEmail";
import { CreatePassword } from "../feature/passwordRecovery/createPassword";
import React from "react";

export const Pages = () => {
  return (
    <Routes>
      <Route path={PATH.LOGIN} element={<LoginRegistration />}></Route>
      <Route path={PATH.PROFILE} element={<Profile />}></Route>
      <Route path={"/friday-cards/"} element={<Profile />}></Route>
      <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />}></Route>
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />}></Route>
      <Route path={PATH.SET_NEW_PASSWORD} element={<CreatePassword />}></Route>
    </Routes>
  );
};
