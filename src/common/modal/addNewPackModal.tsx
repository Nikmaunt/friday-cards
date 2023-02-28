import React, { FC } from "react";
import { ActionModal } from "./actionModal";
import { AddOrEditPack } from "./addOrEditPack";

export const AddNewPackModal: FC<ActivateModalPropsType> = ({ active, setActive }) => {
  return (
    <ActionModal title="Add new pack" active={active} setActive={setActive}>
      <AddOrEditPack active={active} setActive={setActive} />
    </ActionModal>
  );
};

export type ActivateModalPropsType = {
  active: boolean;
  setActive: any;
};
