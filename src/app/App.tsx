import React, { useEffect } from "react";
import "./App.css";
import { Header } from "../common/header/header";
import { ErrorSnackbar } from "../common/errorSnackbar/errorSnackbar";
import { useAppDispatch, useAppSelector } from "./store";
import {selectAppStatus, selectorAppInitialized} from "./appSelectors";
import {useSelector} from "react-redux";
import {StatusLoader} from "../feature/statusLoader/statusLoader";
import {InitializedLoader} from "../feature/initializedLoader/InitializedLoader";
import {PacksTable} from "../feature/packs/PacksTable";
import {SettingsParams} from "../feature/settingParams/settingsParams";
import {packs} from "../feature/packs/selectors";
import {Pages} from "./routes";
import {authMe} from "../feature/loginRegistration/authReducer";

const App = () => {
    const tablePacks = useSelector(packs);
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
      {/*<SettingsParams />*/}
    </>
  );
};

export default App;
