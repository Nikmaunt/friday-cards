import React, { ChangeEvent, ChangeEventHandler } from "react";
import s from "./actionModal.module.css";
import Button from "@mui/material/Button";
import { addPackTC, deletePackTC, editPackTC } from "../../feature/packs/packsReducer";
import { useAppDispatch } from "../../app/store";

export type ButtonsPropsType = {
  mode: "add" | "edit" | "delete" | "addCard";
  pack_id: string | undefined;
  // changePackName?: () => void;
  changeName?: () => void;
  onKeyDownSaveChangeNameHandler?: () => void;
};

export const ModalButtons = (props: ButtonsPropsType) => {
  const dispatch = useAppDispatch();
  const addNewPacksHandler = () => {
    console.log("add new pack handler");
    const newPacks = { cardsPack: { name: "newName" } };
    dispatch(addPackTC(newPacks));
  };

  const deletePackHandler = () => {
    if (props.pack_id) {
      dispatch(deletePackTC(props.pack_id));
    }
  };

  const cancelButtonHandler = () => {};

  return (
    <div className={s.buttonBox}>
      <Button variant="contained" className={s.cancel} onClick={cancelButtonHandler}>
        Cancel
      </Button>
      {props.mode === "delete" ? (
        <Button variant="contained" className={s.delete} onClick={deletePackHandler}>
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
