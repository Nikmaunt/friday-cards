import React from "react";
import { DeleteConfirmation } from "./deleteConfirmation";
import { ActivateModalPropsType } from "../../feature/packs/packs";

type DeleteCardModalPropsType = ActivateModalPropsType & PropsType;

type PropsType = {
  questionTitle: string;
};

export const DeleteCardModal = (props: DeleteCardModalPropsType) => {
  return (
    <DeleteConfirmation
      title={"Delete Card"}
      // title={props.questionTitle}
      removeItem={props.questionTitle}
      pack_id={"id"}
      active={props.active}
      setActive={props.setActive}
    />
  );
};
