import React from "react";
import s from "./actionModal.module.css";
import Button from "@mui/material/Button";
import { addPackTC, deletePackTC, editPackTC } from "../../feature/packs/packsReducer";
import { useAppDispatch } from "../../app/store";
import { deleteCardTC } from "../../feature/cards/cardsReducer";

export type ButtonsPropsType = {
  mode: "add" | "edit" | "deleteCard" | "deletePack" | "addCard" | "editCard";
  pack_id?: string;
  card_id?: string;
  changeName?: () => void;
  onKeyDownSaveChangeNameHandler?: () => void;
};

export const ModalButtons = (props: ButtonsPropsType) => {
  const dispatch = useAppDispatch();
  const addNewPacksHandler = () => {
    const newPacks = { cardsPack: { name: "newName" } };
    dispatch(addPackTC(newPacks));
  };

  const deleteHandler = () => {
    if (props.card_id && props.pack_id && props.mode === "deleteCard") {
      dispatch(deleteCardTC(props.card_id, props.pack_id));
    }
    if (props.pack_id && props.mode === "deletePack") {
      dispatch(deletePackTC(props.pack_id));
    }
  };

  const cancelButtonHandler = () => {};

  return (
    <div className={s.buttonBox}>
      <Button variant="contained" className={s.cancel} onClick={cancelButtonHandler}>
        Cancel
      </Button>
      {props.mode === "deleteCard" || props.mode === "deletePack" ? (
        <Button variant="contained" className={s.delete} onClick={deleteHandler}>
          Delete
        </Button>
      ) : (
        <Button
          variant="contained"
          className={s.save}
          onClick={props.mode === "add" ? addNewPacksHandler : props.onKeyDownSaveChangeNameHandler}
        >
          Save
        </Button>
      )}
    </div>
  );
};
