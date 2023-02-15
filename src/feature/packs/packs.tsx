import { SettingsParams } from "../settingParams/settingsParams";
import { PacksTable } from "./PacksTable";
import React from "react";
import { addPackTC } from "./packsReducer";
import { useAppDispatch } from "../../app/store";
import s from "./Packs.module.css";
import { TitleWithButton } from "../../common/titleWithButton/titleWithButton";

export const Packs = () => {
  const dispatch = useAppDispatch();
  const addNewPacksHandler = () => {
    const newPacks = { cardsPack: { name: "newName" } };
    dispatch(addPackTC(newPacks));
  };
  return (
    <div className={s.wrapper}>
      <TitleWithButton title={"Packs list"} nameButton={"Add new pack"} callback={addNewPacksHandler} />
      <SettingsParams />
      <PacksTable />
    </div>
  );
};
