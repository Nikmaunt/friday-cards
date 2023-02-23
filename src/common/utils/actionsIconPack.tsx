import { useAppDispatch } from "../../app/store";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import s from "./actionsIconPack.module.css";
import React, { useState } from "react";
import { deletePackTC, editPackTC } from "../../feature/packs/packsReducer";
import { useSelector } from "react-redux";
import { selectorIdUser } from "../../feature/loginRegistration/selectors";
import { EditPackModal } from "../modal/editPackModal";
import { DeletePackModal } from "../modal/deletePackModal";

type ActionsIconPackType = {
  pack_id: string;
  user_id: string;
  pack_name: string;
};

export const ActionsIconPack = ({ user_id, pack_id, pack_name }: ActionsIconPackType) => {
  // const dispatch = useAppDispatch();
  const [activeEditPack, setActiveEditPack] = useState(false);
  const [activeDeletePack, setActiveDeletePack] = useState(false);
  const userAuthId = useSelector(selectorIdUser);

  const learnPackCallback = () => {};

  const editPackModalHandler = () => {
    setActiveEditPack(true);
  };

  const deletePackModalHandler = () => {
    setActiveDeletePack(true);
  };

  return (
    <div className={s.active}>
      <span onClick={learnPackCallback}>
        <SchoolOutlinedIcon />
      </span>
      <span onClick={editPackModalHandler}>{user_id === userAuthId ? <BorderColorOutlinedIcon /> : null}</span>
      <span className={s.deleteButton} onClick={deletePackModalHandler}>
        {user_id === userAuthId ? <DeleteOutlinedIcon /> : null}
      </span>

      <EditPackModal active={activeEditPack} setActive={setActiveEditPack} pack_id={pack_id} pack_name={pack_name} />
      <DeletePackModal
        active={activeDeletePack}
        setActive={setActiveDeletePack}
        pack_id={pack_id}
        pack_name={pack_name}
      />
    </div>
  );
};
