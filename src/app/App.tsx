import React, { useEffect } from "react";
import { Header } from "../common/header/header";
import { ErrorSnackbar } from "../common/errorSnackbar/errorSnackbar";
import { authMe } from "../feature/loginRegistration/authReducer";
import { useAppDispatch } from "./store";
import { Pages } from "./routes";
import { useSelector } from "react-redux";
import { isInitialized, selectAppStatus, selectorAuth } from "./appSelectors";
import { InitializedLoader } from "../common/initializedLoader/InitializedLoader";
import { selectorLogin } from "../feature/loginRegistration/selectors";

const App = () => {
  const dispatch = useAppDispatch();
  const status = useSelector(selectAppStatus);
  const isAuth = useSelector(selectorAuth);
  const isLogin = useSelector(selectorLogin);
  const isINIT = useSelector(isInitialized);
  useEffect(() => {
    dispatch(authMe());
  }, []);
  if (!isINIT) {
    return <InitializedLoader />;
  }
  return (
    <>
      <Header />
      <Pages />
      <ErrorSnackbar />
    </>
  );
};

export default App;
