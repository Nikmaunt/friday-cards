import React, { useEffect } from "react";
import { Header } from "../common/header/header";
import { ErrorSnackbar } from "../common/errorSnackbar/errorSnackbar";
import { authMe } from "../feature/loginRegistration/authReducer";
import { useAppDispatch } from "./store";
import { Pages } from "./routes";
import { CreatePassword } from "../feature/passwordRecovery/createPassword";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authMe());
  }, []);

  return (
    <>
      <Header />
      {/*{!isInitialized && <InitializedLoader />}*/}
      {/*{status === "loading" && <StatusLoader />}*/}
      <Pages />
      <ErrorSnackbar />
    </>
  );
};

export default App;
