import React from "react";
import { ActionModal } from "./actionModal";

import { AddOrEditPack } from "./addOrEditPack";
import { ActivateModalPropsType } from "./addNewPackModal";

export const EditPackModal = (props: EditPackModalPropsType) => {
  return (
    <ActionModal title="Edit pack" active={props.active} setActive={props.setActive}>
      <AddOrEditPack // ЗДЕСЬ БЫЛ EDIT PACK
        pack_id={props.pack_id}
        pack_name={props.pack_name}
        active={props.active}
        setActive={props.setActive}
        deckCover={props.deckCover}
      />
    </ActionModal>
  );
};

type PackIdType = {
  pack_id: string;
  pack_name: string;
  deckCover?: string;
};

type EditPackModalPropsType = ActivateModalPropsType & PackIdType;
