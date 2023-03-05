import React from 'react';
import notFoundPageImg from "../../img/notFoundPage.png"
import {SuperButton} from "../superButton/superButton";
import s from './appNotFoundPage.module.css'
import {useNavigate} from "react-router-dom";
import PATH from "../constans/path/path";

const AppNotFoundPage = () => {
    const navigate = useNavigate();
    const returnToPackHandler = () => {
        navigate(PATH.PACKS);
    };
    return (
        <div>
            <div className={s.textWithButton}>
                <span className={s.text}>
                        <h1>Ooops!</h1>
                <h3>Sorry!Page not found!</h3>
                </span>
                <span className={s.button}> <SuperButton name={'Back to homepage'} callback={returnToPackHandler}/>
                </span>
            </div>
            <div className={s.image}>
                <img src={notFoundPageImg} alt="notFoundPageImg"/>
            </div>
        </div>
    );
};

export default AppNotFoundPage;