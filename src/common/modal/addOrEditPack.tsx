import React, { ChangeEvent, FC, useState } from "react";
import { TextField } from "@mui/material";
import s from "./actionModal.module.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { addPackTC, editPackTC } from "../../feature/packs/packsReducer";
import { useAppDispatch } from "../../app/store";
import { ModalButtons } from "./modalButtons";
import { ActivateModalPropsType } from "./addNewPackModal";
import { EditCardPackRequestType } from "../../feature/packs/packsAPI";

export const AddOrEditPack: FC<EditPackPropsType> = ({ pack_name, pack_id, setActive, active }) => {
  const dispatch = useAppDispatch();
  const [packName, setPackName] = useState<string | undefined>(pack_name);
  const [disabled, setDisabled] = useState(true);
  const [addPackName, setAddPackName] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleChange = () => {
    setChecked(!checked);
  };

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (e.currentTarget.value) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    if (pack_id) {
      setPackName(e.currentTarget.value);
    } else {
      setAddPackName(e.currentTarget.value);
    }
  };

  const addNewPackName = async () => {
    const newPack = { cardsPack: { name: addPackName, private: checked } };

    setDisabled(true);
    await dispatch(addPackTC(newPack));
    setDisabled(false);
    setActive(false);

    // if (addPackName.trim() !== "") {
    //   setDisabled(true);
    //   await dispatch(addPackTC(newPack));
    //   setDisabled(false);
    //   setActive(false);
    // } else {
    //   setError("Title is required");
    // }
  };

  const saveChangePackName = async () => {
    if (pack_id && packName) {
      setDisabled(true);
      const editPack: EditCardPackRequestType = {
        cardsPack: {
          _id: pack_id,
          name: packName,
        },
      };
      await dispatch(editPackTC(editPack));
      setDisabled(false);
    }
    // if (props.pack_id && packName && packName.trim() !== "") {
    //   setError("");
    //   setDisabled(true);
    //   await dispatch(editPackTC(props.pack_id, packName));
    //   setDisabled(false);
    //   if (id) {
    //     await dispatch(getAllUserCards(id));
    //   }
    //   props.setActive(false);
    // } else {
    //   setError("Title is required");
    // }
  };

  return (
    <div>
      <TextField
        label={"Name pack"}
        defaultValue={pack_id ? pack_name : addPackName}
        variant="standard"
        className={s.nameInput}
        onChange={changeName}
        error={!!error}
        helperText={error}
      />
      <FormControlLabel
        label="Private pack"
        value={checked}
        className={s.checkbox}
        control={<Checkbox checked={checked} onChange={handleChange} />}
      />
      <ModalButtons
        mode={"editPack"}
        pack_id={pack_id}
        active={active}
        disabled={disabled}
        setActive={setActive}
        onKeyDownSaveChangeNameHandler={pack_id ? saveChangePackName : addNewPackName}
      />
    </div>
  );
};

type EditPackPropsType = ActivateModalPropsType & Partial<PropsType>;

type PropsType = {
  pack_id: string;
  pack_name: string;
};
