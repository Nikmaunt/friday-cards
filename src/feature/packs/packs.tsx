import { SettingsParams } from "../settingParams/settingsParams";
import { PacksTable } from "./packsTable";
import React, {useState} from "react";
import s from "./Packs.module.css";
import { TitleWithButton } from "../../common/titleWithButton/titleWithButton";
import "react-loading-skeleton/dist/skeleton.css";
import {AddNewPackModal} from "../../common/modal/addNewPackModal";
import PATH from "../../common/constans/path/path";
import {useSelector} from "react-redux";
import {selectorAuth} from "../../app/appSelectors";
import {Navigate} from "react-router-dom";

export const Packs = () => {
  const [activeAddNewPack, setActiveAddNewPack] = useState(false);

  const auth = useSelector(selectorAuth);
  const addNewPacksHandler = () => {
    setActiveAddNewPack(true);
  };

  if (!auth) {
    return <Navigate to={PATH.LOGIN} />;
  }
  return (
    <div className={s.wrapper}>
      <TitleWithButton title={"Packs list"} nameButton={"Add new pack"} callback={addNewPacksHandler} />
      <SettingsParams />
      <PacksTable />
      <AddNewPackModal active={activeAddNewPack} setActive={setActiveAddNewPack} />
    </div>
  );
};

export type ActivateModalPropsType = {
  active: boolean;
  setActive: any;
};
