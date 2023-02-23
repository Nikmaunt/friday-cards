import React from "react";
import { ActionModal } from "./actionModal";
import { CreateNewCard } from "./createNewCard";
import { ActivateModalPropsType } from "../../feature/packs/packs";

type AddNewCardModalPropsType = ActivateModalPropsType & PropsType;

type PropsType = {
  pack_id: string;
};

export const AddNewCardModal = (props: AddNewCardModalPropsType) => {
  console.log("pack_id", props.pack_id);
  return (
    <ActionModal title="Add new card" active={props.active} setActive={props.setActive}>
      <CreateNewCard pack_id={props.pack_id} changeName={() => alert("pack")} />
    </ActionModal>
  );
};
