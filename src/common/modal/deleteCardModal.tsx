import React from "react";
import { DeleteConfirmation } from "./deleteConfirmation";
import { ActivateModalPropsType } from "../../feature/packs/packs";

type DeleteCardModalPropsType = ActivateModalPropsType & PropsType;

type PropsType = {
  questionTitle: string;
  card_id: string;
};

export const DeleteCardModal = (props: DeleteCardModalPropsType) => {
  console.log("DeleteCardModal questionTitle", props.questionTitle);
  console.log("DeleteCardModal card_id", props.card_id);
  return (
    <DeleteConfirmation
      title={"Delete Card"}
      // title={props.questionTitle}
      removeItem={props.questionTitle}
      card_id={props.card_id}
      active={props.active}
      setActive={props.setActive}
    />
  );
};
