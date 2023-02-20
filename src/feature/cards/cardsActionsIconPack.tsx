import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import s from "./actionsIconPack.module.css";
import React from "react";
import { selectorIdUser } from "../loginRegistration/selectors";
import { useSelector } from "react-redux";

type ActionsIconPackType = {
  user_id: string;
};

const editPackCallback = () => {
  alert("Edit card");
};

const deletePackCallback = () => {
  alert("Delete card");
};

export const CardsActionsIconPack = (props: ActionsIconPackType) => {
  const userAuthId = useSelector(selectorIdUser);
  return (
    <div className={s.wrapper}>
      <span onClick={editPackCallback}>{props.user_id === userAuthId ? <BorderColorOutlinedIcon /> : null}</span>
      <span onClick={deletePackCallback}>{props.user_id === userAuthId ? <DeleteOutlinedIcon /> : null}</span>
    </div>
  );
};
