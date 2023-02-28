import React, { useState } from "react";
import { CardsList } from "./cardsTable";
import s from "../cards/Cards.module.css";
import { TitleWithButton } from "../../common/titleWithButton/titleWithButton";
import { SearchField } from "../settingParams/searchField/searchField";
import { selectorPackName, selectorPackUserId } from "./cardsSelectors";
import { useSelector } from "react-redux";
import { ReturnBack } from "../../common/returnBack/returnBack";
import PATH from "../../common/constans/path/path";
import { useNavigate, useParams } from "react-router-dom";
import { selectAppStatus, selectorPackId, selectorUserId } from "../../app/appSelectors";
import { AddNewCardModal } from "../../common/modal/addNewCardModal";
import { SkeletonLoader } from "../../common/skeletonLoader/skeletonLoader";

export const Cards = () => {
  const { id } = useParams(); // replace on packId ?
  const userAuthId = useSelector(selectorUserId);
  const userPackId = useSelector(selectorPackUserId);
  const packName = useSelector(selectorPackName);
  const packId = useSelector(selectorPackId);
  const navigate = useNavigate();
  const statusApp = useSelector(selectAppStatus);
  const [activeAddNewCard, setActiveAddNewCard] = useState(false);

  const addNewCardsHandler = () => {
    setActiveAddNewCard(true);
  };

  const learnFriendPackHandler = () => {
    navigate(`${PATH.LEARN_PACK}${id}`);
  };

  const returnToPackHandler = () => {
    navigate(PATH.PACKS);
  };

  const resNameButton = userAuthId === userPackId ? "Add new card" : "Learn to pack";
  const addLearnHandler = () => (userAuthId === userPackId ? addNewCardsHandler() : learnFriendPackHandler());

  return (
    <div className={s.wrapper}>
      <ReturnBack callback={returnToPackHandler} />
      {statusApp === "loading" ? (
        <SkeletonLoader height={"50px"} />
      ) : (
        <TitleWithButton title={packName} nameButton={resNameButton} callback={addLearnHandler} />
      )}
      <div className={s.search}>
        <SearchField />
      </div>
      <AddNewCardModal active={activeAddNewCard} setActive={setActiveAddNewCard} pack_id={id} />
      <CardsList />
    </div>
  );
};
