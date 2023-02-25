import React, { useState } from "react";
import s from "./actionModal.module.css";
import Button from "@mui/material/Button";
import { addPackTC, deletePackTC } from "../../feature/packs/packsReducer";
import { useAppDispatch } from "../../app/store";
import {deleteCardTC} from "../../feature/cards/cardsReducer";
import {useNavigate} from "react-router-dom";
import PATH from "../constans/path/path";

export const ModalButtons = (props: ButtonsPropsType) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const addNewPacksHandler = async () => {
    const newPacks = { cardsPack: { name: "newName" } };
    await dispatch(addPackTC(newPacks));
  };

  const deleteHandler = () => {
    if (props.card_id && props.pack_id && props.mode === "deleteCard") {
      dispatch(deleteCardTC(props.card_id, props.pack_id));
    }
    if (props.pack_id && props.mode === "deletePack") {
      dispatch(deletePackTC(props.pack_id));
      navigate(PATH.PACKS);
    }
  };

  const cancelButtonHandler = () => {
    props.setActive(false);
  };

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
          disabled={props.disabled}
          onClick={props.mode === "add" ? addNewPacksHandler : props.onKeyDownSaveChangeNameHandler}
        >
          Save
        </Button>
      )}
    </div>
  );
};

export type ButtonsPropsType = {
  mode: "add" | "editPack" | "deleteCard" | "deletePack" | "addCard" | "editCard";
  pack_id?: string;
  card_id?: string;
  changeName?: () => void;
  onKeyDownSaveChangeNameHandler?: () => void;
  disabled?: boolean;
  active: boolean;
  setActive: any;
};
