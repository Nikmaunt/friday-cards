import { useAppSelector } from "../../app/store";
import { selectorUserId } from "../../feature/packs/selectors";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import s from "./actionsIconPack.module.css";
import React from "react";

type ActionsIconPackType = {
  user_id: string;
};

const learnPackCallback = () => {
  alert("Learn pack");
};

const editPackCallback = () => {
  alert("Edit pack");
};

const deletePackCallback = () => {
  alert("Delete pack");
};

export const ActionsIconPack = (props: ActionsIconPackType) => {
  const userAuthId = useAppSelector(selectorUserId);
  return (
    <div className={s.active}>
      <span onClick={learnPackCallback}>
        <SchoolOutlinedIcon />
      </span>
      <span onClick={editPackCallback}>{props.user_id === userAuthId ? <BorderColorOutlinedIcon /> : null}</span>
      <span onClick={deletePackCallback}>{props.user_id === userAuthId ? <DeleteOutlinedIcon /> : null}</span>
    </div>
  );
};
