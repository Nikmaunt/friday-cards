import React from "react";
import { DeleteConfirmation } from "./deleteConfirmation";
import { ActivateModalPropsType } from "../../feature/packs/packs";

type DeletePackModalPropsType = ActivateModalPropsType & PropsType;

type PropsType = {
  pack_id: string;
  pack_name: string;
};

export const DeletePackModal = (props: DeletePackModalPropsType) => {
  return (
    <DeleteConfirmation
      title={"Delete Pack"}
      removeItem={props.pack_name}
      active={props.active}
      setActive={props.setActive}
      pack_id={props.pack_id}
    />
  );
};
