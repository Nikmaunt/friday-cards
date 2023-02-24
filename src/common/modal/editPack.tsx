import React, { ChangeEvent, useState } from "react";
import { TextField } from "@mui/material";
import s from "./actionModal.module.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { addPackTC, editPackTC } from "../../feature/packs/packsReducer";
import { useAppDispatch } from "../../app/store";
import { ModalButtons } from "./modalButtons";
import { ActivateModalPropsType } from "../../feature/packs/packs";

export const EditPack = (props: EditPackPropsType) => {
  const dispatch = useAppDispatch();
  const [packName, setPackName] = useState<string | undefined>(props.pack_name);
  const [addPackName, setAddPackName] = useState<string>("");
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    console.log("checked", checked);
    setChecked(!checked);
  };

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.pack_id) {
      setPackName(e.currentTarget.value);
    } else {
      setAddPackName(e.currentTarget.value);
    }
  };

  const onKeyDownSaveAddPackNameHandler = async () => {
    const newPack = { cardsPack: { name: addPackName, private: checked } };
    await dispatch(addPackTC(newPack));
    props.setActive(false);
  };

  const onKeyDownSaveChangePackNameHandler = async () => {
    if (props.pack_id && packName) {
      await dispatch(editPackTC(props.pack_id, packName));
      props.setActive(false);
    }
  };

  return (
    <div>
      <TextField
        label={"Name pack"}
        defaultValue={props.pack_id ? props.pack_name : addPackName}
        variant="standard"
        className={s.nameInput}
        onChange={changeName}
      />
      <FormControlLabel
        label="Private pack"
        value={checked}
        className={s.checkbox}
        control={<Checkbox checked={checked} onChange={handleChange} />}
      />
      <ModalButtons
        mode={"editPack"}
        pack_id={props.pack_id}
        active={props.active}
        setActive={props.setActive}
        changeName={() => changeName}
        onKeyDownSaveChangeNameHandler={
          props.pack_id ? onKeyDownSaveChangePackNameHandler : onKeyDownSaveAddPackNameHandler
        }
      />
    </div>
  );
};

type EditPackPropsType = ActivateModalPropsType & Partial<PropsType>;

type PropsType = {
  pack_id: string;
  pack_name: string;
};
