import s from "./TitleWithButton.module.css";
import {SuperButton} from "../superButton/superButton";
import React from "react";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PATH from "../constans/path/path";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {selectorUserId} from "../../app/appSelectors";
import {selectorPackName, selectorPackUserId} from "../../feature/cards/cardsSelectors";
import {TitleDropdown} from "./titleDropdown";
import learnIcon from "../../img/learnIcon.svg";
export const TitleWithButton = (props: TitleWithButtonPropsType) => {
    const {title, nameButton, callback} = props;
    const {id} = useParams();
    const packName = useSelector(selectorPackName);
    const userAuthId = useSelector(selectorUserId);
    const userPackId = useSelector(selectorPackUserId);
    const navigate = useNavigate();
    const learnPackHandler = () => {
        navigate(`${PATH.LEARN_PACK}${id}`);
    };

    return (
        <div className={s.titleButton}>
            <h2>{id === userPackId ? packName : title}</h2>
            {userAuthId === userPackId ? < TitleDropdown pack_id={id} pack_name={packName}/>  : null }
            {id && (
                <button className={s.learnButton} onClick={learnPackHandler}><img className={s.learnIcon}  src={learnIcon } alt=""/> </button>
            )}
            <div className={s.button}>
                <SuperButton name={nameButton} callback={callback}/>
            </div>
        </div>
    );
};
export type TitleWithButtonPropsType = {
    title: string;
    nameButton: string;
    callback: () => void;
};
