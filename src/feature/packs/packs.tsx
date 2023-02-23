import { SettingsParams } from "../settingParams/settingsParams";
import { PacksTable } from "./packsTable";
import React from "react";
import { addPackTC } from "./packsReducer";
import { useAppDispatch } from "../../app/store";
import s from "./Packs.module.css";
import { TitleWithButton } from "../../common/titleWithButton/titleWithButton";
import "react-loading-skeleton/dist/skeleton.css";

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
