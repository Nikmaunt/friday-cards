import React from "react";
import { ActionModal } from "./actionModal";
import { CreateCard } from "./createCard";
import { ActivateModalPropsType } from "../../feature/packs/packs";

type AddNewCardModalPropsType = ActivateModalPropsType & PropsType;

type PropsType = {
  pack_id: string;
};

export const AddNewCardModal = (props: AddNewCardModalPropsType) => {
  console.log("pack_id", props.pack_id);
  return (
    <ActionModal title="Add new card" active={props.active} setActive={props.setActive}>
      <CreateCard
        mode={"addCard"}
        pack_id={props.pack_id}
        changeName={() => alert("pack")}
        active={props.active}
        setActive={props.setActive}
      />
    </ActionModal>
  );
};
