import React, { useState } from "react";
import { ActionModal } from "./actionModal";
import s from "./actionModal.module.css";
import Button from "@mui/material/Button";
import { ModalButtons } from "./modalButtons";
import { TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { EditPack } from "./editPack";
import { ActivateModalPropsType } from "../../feature/packs/packs";

type PackIdType = {
  pack_id: string;
  pack_name: string;
};

type EditPackModalPropsType = ActivateModalPropsType & PackIdType;

export const EditPackModal = (props: EditPackModalPropsType) => {
  return (
    <ActionModal title="Edit pack" active={props.active} setActive={props.setActive}>
      <EditPack pack_id={props.pack_id} pack_name={props.pack_name} />
      {/*<ModalButtons mode={"edit"} pack_id={props.pack_id} />*/}
    </ActionModal>
  );
};
