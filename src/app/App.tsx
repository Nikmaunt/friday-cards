import React, { useEffect } from "react";
import "./App.css";
import { Header } from "../common/header/header";
import { Route, Routes } from "react-router-dom";
import { Profile } from "../feature/profile/profile";
import { ForgotPassword } from "../feature/passwordRecovery/forgotPassword";
import { CheckEmail } from "../feature/passwordRecovery/checkEmail";
import { CreatePassword } from "../feature/passwordRecovery/createPassword";
import { CircularProgress, LinearProgress } from "@mui/material";
import { ErrorSnackbar } from "../common/errorSnackbar/errorSnackbar";
import { RequestStatusType } from "./appReducer";
import { useAppDispatch, useAppSelector } from "./store";
import { PacksList } from "../feature/packs/PacksList";
import {LoginRegistration} from "../feature/loginRegistration/loginRegistration";
import {authMe} from "../feature/loginRegistration/authReducer";
import {CardsTable} from "../feature/cards/cardsTable";

const App = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized);
  const status = useAppSelector<RequestStatusType>((state) => state.app.status);

  useEffect(() => {
    dispatch(authMe());
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <>
        <ErrorSnackbar />
        <Header />
        {status === "loading" && <LinearProgress sx={{ marginBottom: "40px" }} />}
        <div>
          <Routes>
            <Route path={"/friday-cards/login"} element={<LoginRegistration />}></Route>
            <Route path={"/friday-cards/registration"} element={<LoginRegistration />}></Route>
            <Route path={"/friday-cards/profile"} element={<Profile />}></Route>
            <Route path={"/friday-cards/"} element={<Profile />}></Route>
            <Route path={"/friday-cards/forgot-password"} element={<ForgotPassword />}></Route>
            <Route path={"/friday-cards"} element={<LoginRegistration />}></Route>
            <Route path={"/friday-cards/check-email"} element={<CheckEmail />}></Route>
            <Route path={"/friday-cards/set-new-password/:token"} element={<CreatePassword />}></Route>
            <Route path={"/friday-cards/packs-list"} element={<PacksList PageTitle={"Packs list"} />}></Route>
            <Route path={"/friday-cards/cards-list"} element={<CardsTable />}></Route>
          </Routes>
        </div>
      </>
    </div>
  );
};

export default App;
