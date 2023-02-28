import { Route, Routes } from "react-router-dom";
import PATH from "../common/constans/path/path";
import { LoginRegistration } from "../feature/loginRegistration/loginRegistration";
import { Profile } from "../feature/profile/profile";
import { CheckEmail } from "../feature/passwordRecovery/checkEmail";
import { CreatePassword } from "../feature/passwordRecovery/createPassword";
import React from "react";
import { ForgotPassword } from "../feature/passwordRecovery/forgotPassword";
import { Packs } from "../feature/packs/packs";
import { Cards } from "../feature/cards/cards";
import { EmptyPageField } from "../feature/packs/emptyPageField";
import { LearnCardPack } from "../feature/cards/learnCardPack";

export const Pages = () => {
  return (
    <Routes>
      <Route path={PATH.LOGIN} element={<LoginRegistration />}></Route>
      <Route path={PATH.PROFILE} element={<Profile />}></Route>
      <Route path={"/"} element={<Packs />}></Route>
      <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />}></Route>
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />}></Route>
      <Route path={PATH.SET_NEW_PASSWORD} element={<CreatePassword />}></Route>
      <Route path={PATH.PACKS} element={<Packs />}></Route>
      <Route path={PATH.EMPTY_PACK} element={<EmptyPageField />}></Route>
      <Route path={PATH.LEARN_PACK_BY_ID} element={<LearnCardPack />}></Route>
      <Route path={PATH.CARDS_LIST} element={<Cards />}></Route>
    </Routes>
  );
};
