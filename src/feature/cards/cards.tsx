import React, { useEffect } from "react";
import { CardsList } from "./cardsTable";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { addPackTC, fetchPacksTC } from "../packs/packsReducer";
import s from "../cards/Cards.module.css";
import { TitleWithButton } from "../../common/titleWithButton/titleWithButton";
import { SearchField } from "../settingParams/searchField/searchField";
import { selectorPacks, selectorUserId } from "../packs/selectors";
import { selectorCards, selectorPackUserId } from "./cardsSelectors";
import { setUserCards } from "./cardsReducer";
import { useSelector } from "react-redux";
import { ReturnBack } from "../../common/returnBack/returnBack";
import PATH from "../../common/constans/path/path";
import { useNavigate } from "react-router-dom";

export const Cards = () => {
  const userAuthId = useSelector(selectorUserId);
  const userCards = useSelector(selectorCards);
  const userPackId = useSelector(selectorPackUserId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log("ididid", userAuthId === userPackId);
  const addNewCardsHandler = () => {};
  const isCardsPackEmpty = userCards === undefined ? "packEmpty" : "full";
  const returnToPackHandler = async () => {
    console.log("work");
    await dispatch(fetchPacksTC({}));
    // return <Navigate to={PATH.PACKS} />;
    navigate(PATH.PACKS);
  };
  return (
    <div className={s.wrapper}>
      <ReturnBack callback={returnToPackHandler} />
      {isCardsPackEmpty === "full" ? (
        <TitleWithButton
          title={userAuthId === userPackId ? "My Pack" : "Friends Pack"}
          nameButton={userAuthId === userPackId ? "Add new card" : "Learn to pack"}
          // title={"Friends Pack"}
          // nameButton={"Add new card"}
          callback={() => {}}
        />
      ) : (
        <div>
          <TitleWithButton title={"Name pack"} nameButton={"Add new card"} callback={() => {}} />
        </div>
      )}
      {userCards && (
        <div className={s.search}>
          <SearchField />
        </div>
      )}
      <CardsList />
    </div>
  );
};
