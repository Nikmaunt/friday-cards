import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import s from "./actionsIconPack.module.css";
import React, { useState } from "react";
import { selectorIdUser } from "../loginRegistration/selectors";
import { useSelector } from "react-redux";
import { DeleteCardModal } from "../../common/modal/deleteCardModal";

type ActionsIconPackType = {
  user_id: string;
  questionTitle: string;
  card_id: string;
};

export const CardsActionsIconPack = (props: ActionsIconPackType) => {
  const userAuthId = useSelector(selectorIdUser);

  const [openDeleteModalCard, setOpenDeleteModalCard] = useState(false);

  const editPackCallback = () => {
    alert("Edit card");
  };

  const deletePackCallback = () => {
    setOpenDeleteModalCard(true);
  };

  return (
    <div className={s.wrapper}>
      <span onClick={editPackCallback}>{props.user_id === userAuthId ? <BorderColorOutlinedIcon /> : null}</span>
      <span onClick={deletePackCallback}>{props.user_id === userAuthId ? <DeleteOutlinedIcon /> : null}</span>
      <DeleteCardModal
        active={openDeleteModalCard}
        setActive={setOpenDeleteModalCard}
        questionTitle={props.questionTitle}
        card_id={props.card_id}
      />
    </div>
  );
};
