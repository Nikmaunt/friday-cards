import React from "react";
import { ActionModal } from "./actionModal";
import { CreateCard } from "./createCard";
import { ActivateModalPropsType } from "../../feature/packs/packs";

type EditModalPropsType = ActivateModalPropsType & PropsType;

type PropsType = {
  pack_id: string;
  card_id?: string;
};

export const EditCardModal = (props: EditModalPropsType) => {
  return (
    <ActionModal title="Edit card" active={props.active} setActive={props.setActive}>
      <CreateCard mode={"editCard"} pack_id={props.pack_id} changeName={() => alert("pack")} card_id={props.card_id} />
    </ActionModal>
  );
};
