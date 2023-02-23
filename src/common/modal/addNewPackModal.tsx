import React from "react";
import { ActionModal } from "./actionModal";
import { EditPack } from "./editPack";
import { ActivateModalPropsType } from "../../feature/packs/packs";

export const AddNewPackModal = (props: ActivateModalPropsType) => {
  return (
    <ActionModal title="Add new pack" active={props.active} setActive={props.setActive}>
      {/*<EditPack />*/}
      {/**/}
      <EditPack active={props.active} setActive={props.setActive} />
    </ActionModal>
  );
};
