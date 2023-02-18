import React, { useEffect } from "react";
import { CardsList } from "./cardsTable";
import { useAppDispatch } from "../../app/store";
import s from "../cards/Cards.module.css";
import { TitleWithButton } from "../../common/titleWithButton/titleWithButton";
import { SearchField } from "../settingParams/searchField/searchField";
import { selectorUserId } from "../packs/packsSelectors";
import { selectorPackUserId } from "./cardsSelectors";
import { useSelector } from "react-redux";
import { ReturnBack } from "../../common/returnBack/returnBack";
import PATH from "../../common/constans/path/path";
import { useNavigate, useParams } from "react-router-dom";
import { addNewCardTC, getUserCardByPackId } from "./cardsReducer";

export const Cards = () => {
  const { id } = useParams();
  const userAuthId = useSelector(selectorUserId);
  const userPackId = useSelector(selectorPackUserId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getUserCardByPackId(id));
    }
  }, []);

  const addNewCardsHandler = async () => {
    if (id) await dispatch(addNewCardTC(id));
    //await dispatch(getUserCardByPackId(packId));
    //return <Navigate to={`${PATH.CARDS_LIST}:${packId}`} />;
    //navigate(`${PATH.CARDS_LIST}:${packId}`);
  };
  const learnFriendPackHandler = () => {
    console.log("LEARN PACK");
  };

  const returnToPackHandler = () => {
    navigate(PATH.PACKS);
  };

  return (
    <div className={s.wrapper}>
      <ReturnBack callback={returnToPackHandler} />
      <TitleWithButton
        title={userAuthId === userPackId ? "My Pack" : "Friends Pack"}
        nameButton={userAuthId === userPackId ? "Add new card" : "Learn to pack"}
        callback={userAuthId === userPackId ? addNewCardsHandler : learnFriendPackHandler}
      />
      <div className={s.search}>
        <SearchField />
      </div>
      <CardsList />
    </div>
  );
};
