import React from "react";
import { ActionModal } from "./actionModal";

import { AddOrEditPack } from "./addOrEditPack";
import { ActivateModalPropsType } from "./addNewPackModal";

export const EditPackModal = (props: EditPackModalPropsType) => {
  return (
    <ActionModal title="Edit pack" active={props.active} setActive={props.setActive}>
      <AddOrEditPack
        pack_id={props.pack_id}
        pack_name={props.pack_name}
        active={props.active}
        setActive={props.setActive}
      />
    </ActionModal>
  );
};

type PackIdType = {
  pack_id: string;
  pack_name: string;
};

type EditPackModalPropsType = ActivateModalPropsType & PackIdType;
