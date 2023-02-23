import React, { ChangeEvent, ChangeEventHandler } from "react";
import s from "./actionModal.module.css";
import Button from "@mui/material/Button";
import { addPackTC, deletePackTC, editPackTC } from "../../feature/packs/packsReducer";
import { useAppDispatch } from "../../app/store";
import { deleteCardTC } from "../../feature/cards/cardsReducer";
import { useSelector } from "react-redux";
import { selectorPackUserId } from "../../feature/cards/cardsSelectors";

export type ButtonsPropsType = {
  mode: "add" | "edit" | "deleteCard" | "deletePack" | "addCard";
  pack_id?: string;
  card_id?: string;
  // id: string;
  // changePackName?: () => void;
  changeName?: () => void;
  onKeyDownSaveChangeNameHandler?: () => void;
};

export const ModalButtons = (props: ButtonsPropsType) => {
  const packId = useSelector(selectorPackUserId);
  const dispatch = useAppDispatch();
  const addNewPacksHandler = () => {
    console.log("add new pack handler");
    const newPacks = { cardsPack: { name: "newName" } };
    dispatch(addPackTC(newPacks));
  };

  // const deletePackHandler = () => {
  //   if (props.pack_id) {
  //     console.log("pack_id", props.pack_id);
  //     dispatch(deletePackTC(props.pack_id));
  //   }
  // };

  const deleteHandler = () => {
    console.log("deleteHandler card_id", props.card_id);
    console.log("deleteHandler pack_id", props.pack_id);
    console.log("deleteHandler packId", packId);
    if (props.mode === "deleteCard") {
      dispatch(deleteCardTC(props.card_id, packId));
    }
    if (props.mode === "deletePack") {
      console.log("deletePack pack_id", props.pack_id);
      // dispatch(deletePackTC(props.pack_id));
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
        <Button
          variant="contained"
          className={s.delete}
          // onClick={props.card_id ? deleteCardHandler : deletePackHandler}
          onClick={deleteHandler}
        >
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
