import React, {useEffect} from 'react';
import {CardsList} from "./cardsTable";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {addPackTC} from "../packs/packsReducer";
import s from "../cards/Cards.module.css";
import {TitleWithButton} from "../../common/titleWithButton/titleWithButton";
import {SearchField} from "../settingParams/searchField/searchField";
import {selectorPacks, selectorUserId} from "../packs/selectors";
import {selectorCards} from "./cardsSelectors";
import {setUserCards} from "./cardsReducer";


export const Cards = () => {
    const userAuthId = useAppSelector(selectorUserId);
    const userCardPacksId = useAppSelector(selectorCards);
    const userCards = useAppSelector(selectorCards);

    const addNewCardsHandler = () => {
    };
    const isCardsPackEmpty = userCards.cards === undefined ? 'packEmpty' : 'full'


    return (
        <div className={s.wrapper}>
            {isCardsPackEmpty === 'full' ?
                <TitleWithButton title={userAuthId === userCardPacksId.packUserId ? "My Pack" : 'Friends Pack'}
                                 nameButton={userAuthId === userCardPacksId.packUserId ? "Add new card" : 'Learn to pack'}
                                 callback={() => {
                                 }}/>
                :
                <div>
                    <TitleWithButton title={'Name pack'} nameButton={"Add new card"} callback={() => {
                    }}/>
                </div>
            }
            {userCards &&
                <div className={s.search}>
                    <SearchField/>
                </div>
            }
            <CardsList/>
        </div>
    );
};

