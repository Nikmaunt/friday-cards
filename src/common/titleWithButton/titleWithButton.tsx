import s from "./TitleWithButton.module.css";
import {SuperButton} from "../superButton/superButton";
import React from "react";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PATH from "../constans/path/path";
import {getAllUserCards} from "../../feature/cards/cardsReducer";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {selectorUserId} from "../../app/appSelectors";
import {selectorPackUserId} from "../../feature/cards/cardsSelectors";

export const TitleWithButton = (props: TitleWithButtonPropsType) => {
  const { title, nameButton, callback } = props;
  const { id } = useParams();
  const userAuthId = useSelector(selectorUserId);
  const userPackId = useSelector(selectorPackUserId);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const learnPackHandler = () => {
    navigate(`${PATH.LEARN_PACK}${id}`);
    if (id) {
      dispatch(getAllUserCards(id));
    }
  };
  return (
    <div className={s.titleButton}>
      <h2>{title} </h2>
      {id && (
        <span className={s.learnIcon} onClick={learnPackHandler}>
          <SchoolOutlinedIcon className={s.learnIcon} />
        </span>
      )}
      <div className={s.button}>
        <SuperButton name={nameButton} callback={callback} />
      </div>
    </div>
  );
};
export type TitleWithButtonPropsType = {
    title: string;
    nameButton: string;
    callback: () => void;
};
