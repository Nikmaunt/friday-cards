import { SettingsParams } from "../settingParams/settingsParams";
import { PacksTable } from "./packsTable";
import React, { useState } from "react";
import s from "./Packs.module.css";
import { TitleWithButton } from "../../common/titleWithButton/titleWithButton";
import "react-loading-skeleton/dist/skeleton.css";
import { AddNewPackModal } from "../../common/modal/addNewPackModal";


export const Packs = () => {
  const [activeAddNewPack, setActiveAddNewPack] = useState(false);

  const addNewPacksHandler = () => {
    setActiveAddNewPack(true);
  };

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
