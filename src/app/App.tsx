import React, { useEffect } from "react";
import "./App.css";
import { Header } from "../common/header/header";
import { Route, Routes } from "react-router-dom";
import { Profile } from "../feature/profile/profile";
import { NotFoundPage } from "../feature/notFoundPage/notFoundPage";
import { PasswordRecovery } from "../feature/passwordRecovery/passwordRecovery";
import { NewPassword } from "../feature/newPassword/newPassword";
import { TestComponents } from "../feature/testComponents/testComponents";
import { LoginRegistration } from "../common/loginRegistration/loginRegistration";
import { useAppDispatch, useAppSelector } from "./store";
import { authMe } from "../common/loginRegistration/authReducer";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import { RequestStatusType } from "./appReducer";

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
        <Header />
        {status === "loading" && <LinearProgress sx={{ marginBottom: "40px" }} />}
        <div>
          <Routes>
            <Route path={"/friday-cards/login"} element={<LoginRegistration />}></Route>
            <Route path={"/friday-cards/registration"} element={<LoginRegistration />}></Route>
            <Route path={"/friday-cards/profile"} element={<Profile />}></Route>
            <Route path={"/friday-cards/404"} element={<NotFoundPage />}></Route>
            <Route path={"/friday-cards/password-recovery"} element={<PasswordRecovery />}></Route>
            <Route path={"/friday-cards/new-password"} element={<NewPassword />}></Route>
            <Route path={"/friday-cards/test-components"} element={<TestComponents />}></Route>
            <Route path={"/friday-cards"} element={<LoginRegistration />}></Route>
            <Route path={"*"} element={<NotFoundPage />}></Route>
          </Routes>
        </div>
      </>
    </div>
  );
};

export default App;
