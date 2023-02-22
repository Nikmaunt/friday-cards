import { SettingsParams } from "../settingParams/settingsParams";
import { PacksTable } from "./packsTable";
import React, { useState } from "react";
import { addPackTC } from "./packsReducer";
import { useAppDispatch } from "../../app/store";
import s from "./Packs.module.css";
import { TitleWithButton } from "../../common/titleWithButton/titleWithButton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import { selectorAuth } from "../../app/appSelectors";
import { Navigate } from "react-router-dom";
import PATH from "../../common/constans/path/path";
import { AddNewPackModal } from "../../common/modal/addNewPackModal";

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
