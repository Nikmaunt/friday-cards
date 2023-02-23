import React, { ChangeEvent, useState } from "react";
import { TextField } from "@mui/material";
import s from "./actionModal.module.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { addPackTC, editPackTC } from "../../feature/packs/packsReducer";
import { useAppDispatch } from "../../app/store";
import { ModalButtons } from "./modalButtons";
import { ActivateModalPropsType } from "../../feature/packs/packs";

type EditPackPropsType = ActivateModalPropsType & PropsType;

type PropsType = {
  pack_id?: string;
  pack_name?: string;
};

export const EditPack = (props: EditPackPropsType) => {
  const dispatch = useAppDispatch();
  const [packName, setPackName] = useState<string | undefined>(props.pack_name);
  const [addPackName, setAddPackName] = useState<string>("");
  const [checked, setChecked] = useState([true, false]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.pack_id) {
      setPackName(e.currentTarget.value);
    } else {
      setAddPackName(e.currentTarget.value);
    }
  };

  const onKeyDownSaveAddPackNameHandler = async () => {
    const newPack = { cardsPack: { name: addPackName } };
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
        className={s.checkbox}
        control={<Checkbox checked={checked[1]} onChange={handleChange} />}
      />
      <ModalButtons
        mode={"editPack"}
        pack_id={props.pack_id}
        changeName={() => changeName}
        onKeyDownSaveChangeNameHandler={
          props.pack_id ? onKeyDownSaveChangePackNameHandler : onKeyDownSaveAddPackNameHandler
        }
      />
    </div>
  );
};
