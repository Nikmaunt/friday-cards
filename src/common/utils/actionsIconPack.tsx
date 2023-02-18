import { useAppDispatch } from "../../app/store";
import { selectorUserId } from "../../feature/packs/packsSelectors";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import s from "./actionsIconPack.module.css";
import React from "react";
import { deletePackTC, editPackTC } from "../../feature/packs/packsReducer";
import { useSelector } from "react-redux";

type ActionsIconPackType = {
  pack_id: string;
  user_id: string;
};

export const ActionsIconPack = ({ user_id, pack_id }: ActionsIconPackType) => {
  const dispatch = useAppDispatch();
  const userAuthId = useSelector(selectorUserId);
  const learnPackCallback = () => {};

  const editPackCallback = () => {
    dispatch(editPackTC(pack_id));
  };

  const deletePackCallback = () => {
    dispatch(deletePackTC(pack_id));
  };

  return (
    <div className={s.active}>
      <span onClick={learnPackCallback}>
        <SchoolOutlinedIcon />
      </span>
      <span onClick={editPackCallback}>{user_id === userAuthId ? <BorderColorOutlinedIcon /> : null}</span>
      <span onClick={deletePackCallback}>{user_id === userAuthId ? <DeleteOutlinedIcon /> : null}</span>
    </div>
  );
};
