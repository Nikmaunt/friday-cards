import React, { useState } from "react";
import { CardsList } from "./cardsTable";
import { useAppDispatch } from "../../app/store";
import s from "../cards/Cards.module.css";
import { TitleWithButton } from "../../common/titleWithButton/titleWithButton";
import { SearchField } from "../settingParams/searchField/searchField";

import { selectorPackName, selectorPackUserId } from "./cardsSelectors";
import { useSelector } from "react-redux";
import { ReturnBack } from "../../common/returnBack/returnBack";
import PATH from "../../common/constans/path/path";
import { useNavigate, useParams } from "react-router-dom";
import { addNewCardTC, getCards } from "./cardsReducer";
import { selectAppStatus } from "../../app/appSelectors";
import Skeleton from "react-loading-skeleton";
import { selectorIdUser } from "../loginRegistration/selectors";
import { AddNewCardModal } from "../../common/modal/addNewCardModal";

export const Cards = () => {
  const { id } = useParams();
  const { question } = useParams();
  const { answer } = useParams();

  const userAuthId = useSelector(selectorIdUser);
  const userPackId = useSelector(selectorPackUserId);
  const packName = useSelector(selectorPackName);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const statusApp = useSelector(selectAppStatus);
  const [activeAddNewCard, setActiveAddNewCard] = useState(false);
  const addNewCardsHandler = async () => {
    console.log("question", question);
    console.log("answer", answer);
    //@ts-ignore
    if (id) await dispatch(addNewCardTC(id, question, answer));
    //await dispatch(getUserCardByPackId(packId));
    //return <Navigate to={`${PATH.CARDS_LIST}:${packId}`} />;
    //navigate(`${PATH.CARDS_LIST}:${packId}`);
  };

  const addNewPackModalHandler = async () => {
    console.log("add");
    setActiveAddNewCard(true);
  };

  const learnFriendPackHandler = () => {
    console.log("LEARN PACK");
  };

  const CardEmpty = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    packCreated: "",
    packName: "",
    packPrivate: false,
    packUpdated: "",
    packUserId: "",
    page: 1,
    pageCount: 4,
    token: "",
    tokenDeathTime: "",
  };

  const returnToPackHandler = () => {
    dispatch(getCards(CardEmpty));
    navigate(PATH.PACKS);
  };

  const resNameButton = userAuthId === userPackId ? "Add new card" : "Learn to pack";
  const addLearnHandler = () => (userAuthId === userPackId ? addNewPackModalHandler() : learnFriendPackHandler());

  return (
    <div className={s.wrapper}>
      <ReturnBack callback={returnToPackHandler} />
      {statusApp === "loading" ? (
        <Skeleton height={"50px"} background-color="#f3f3f3" foreground-color="#ecebeb" />
      ) : (
        <TitleWithButton title={packName} nameButton={resNameButton} callback={addLearnHandler} />
      )}
      <div className={s.search}>
        <SearchField />
      </div>

      {/*{statusApp === "loading" ? (*/}
      {/*  <Skeleton height={"60px"} count={5} background-color="#f3f3f3" foreground-color="#ecebeb" />*/}
      {/*) : (*/}
      {/*  <CardsList />*/}
      {/*)}*/}
      {/*@ts-ignore*/}
      <AddNewCardModal active={activeAddNewCard} setActive={setActiveAddNewCard} pack_id={id} />
      <CardsList />
    </div>
  );
};
