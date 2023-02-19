import React from "react";
import { CardsList } from "./cardsTable";
import { useAppDispatch } from "../../app/store";
import s from "../cards/Cards.module.css";
import { TitleWithButton } from "../../common/titleWithButton/titleWithButton";
import { SearchField } from "../settingParams/searchField/searchField";
import { selectorUserId } from "../packs/packsSelectors";
import { selectorPackName, selectorPackUserId } from "./cardsSelectors";
import { useSelector } from "react-redux";
import { ReturnBack } from "../../common/returnBack/returnBack";
import PATH from "../../common/constans/path/path";
import { useNavigate, useParams } from "react-router-dom";
import { addNewCardTC } from "./cardsReducer";
import { selectAppStatus } from "../../app/appSelectors";

export const Cards = () => {
  const { id } = useParams();
  const userAuthId = useSelector(selectorUserId);
  const userPackId = useSelector(selectorPackUserId);
  const packName = useSelector(selectorPackName);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectAppStatus);
  const addNewCardsHandler = async () => {
    if (id) await dispatch(addNewCardTC(id));
    //await dispatch(getUserCardByPackId(packId));
    //return <Navigate to={`${PATH.CARDS_LIST}:${packId}`} />;
    //navigate(`${PATH.CARDS_LIST}:${packId}`);
  };

  const learnFriendPackHandler = () => {
    console.log("LEARN PACK");
  };

  // const CardEmpty = {
  //   cards: [],
  //   cardsTotalCount: 0,
  //   maxGrade: 0,
  //   minGrade: 0,
  //   packCreated: "",
  //   packName: "",
  //   packPrivate: false,
  //   packUpdated: "",
  //   packUserId: "",
  //   page: 1,
  //   pageCount: 4,
  //   token: "",
  //   tokenDeathTime: "",
  // };

  const returnToPackHandler = () => {
    navigate(PATH.PACKS);
  };

  const resNameButton = userAuthId === userPackId ? "Add new card" : "Learn to pack";
  const addLearnHandler = () => (userAuthId === userPackId ? addNewCardsHandler() : learnFriendPackHandler());

  return (
    <div className={s.wrapper}>
      <ReturnBack callback={returnToPackHandler} />
      <TitleWithButton title={packName} nameButton={resNameButton} callback={addLearnHandler} />
      <div className={s.search}>
        <SearchField />
      </div>
      <CardsList />
    </div>
  );
};
