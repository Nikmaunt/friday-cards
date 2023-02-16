import React, { useEffect } from "react";
import { Header } from "../common/header/header";
import { ErrorSnackbar } from "../common/errorSnackbar/errorSnackbar";
import { authMe } from "../feature/loginRegistration/authReducer";
import { useAppDispatch } from "./store";
import { Pages } from "./routes";
import { InitializedLoader } from "../feature/initializedLoader/InitializedLoader";
import { StatusLoader } from "../feature/statusLoader/statusLoader";
import { useSelector } from "react-redux";
import { selectAppStatus, selectorAppInitialized } from "./appSelectors";
import { SettingsParams } from "../feature/settingParams/settingsParams";
import { PacksTable } from "../feature/packs/PacksTable";
import { selectorLogin } from "../feature/loginRegistration/selectors";
import { Navigate } from "react-router-dom";
import PATH from "../common/constans/path/path";

const App = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useSelector(selectorAppInitialized);
  const status = useSelector(selectAppStatus);
  const isLogin = useSelector(selectorLogin);

  useEffect(() => {
    dispatch(authMe());
  }, []);

  if (!isInitialized) {
    return <InitializedLoader />;
  }
  // if (!isLogin) {
  //   return <Navigate to={PATH.LOGIN} />;
  // }

  return (
    <>
      <Header />
      {status === "loading" && <StatusLoader />}
      <Pages />
      <ErrorSnackbar />
    </>
  );
};

export default App;
