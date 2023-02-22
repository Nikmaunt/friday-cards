import React from "react";
import { ActionModal } from "./actionModal";
import { CreateNewCard } from "./createNewCard";

export const EditCardModal = () => {
  return (
    <ActionModal title="Edit card" active={false} setActive={"setActive"}>
      <CreateNewCard pack_id={"id"} changeName={() => alert("pack")} />
    </ActionModal>
  );
};
