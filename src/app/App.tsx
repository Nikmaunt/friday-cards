import React, { useEffect } from "react";
import "./App.css";
import { Header } from "../common/header/header";
import { Route, Routes } from "react-router-dom";
import { Profile } from "../feature/profile/profile";
import { ForgotPassword } from "../feature/passwordRecovery/ForgotPassword";
import { CheckEmail } from "../feature/passwordRecovery/CheckEmail";
import { CreatePassword } from "../feature/passwordRecovery/CreatePassword";
import { LoginRegistration } from "../common/loginRegistration/loginRegistration";
import { CircularProgress, LinearProgress } from "@mui/material";
import { ErrorSnackbar } from "../common/errorSnackbar/errorSnackbar";
import { authMe } from "../common/loginRegistration/authReducer";
import { RequestStatusType } from "./appReducer";
import { useAppDispatch, useAppSelector } from "./store";

const App = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useSelector(selectorAppInitialized);
  const status = useSelector(selectAppStatus);

  useEffect(() => {
    dispatch(authMe());
  }, []);

  if (!isInitialized) {
    return <InitializedLoader />;
  }

  return (
    <>
      <Header />
      <PacksTable packs={tablePacks} />
      {status === "loading" && <StatusLoader />}
      <Pages />
      <ErrorSnackbar />
      <SettingsParams />
    </>
  );
};

export default App;
