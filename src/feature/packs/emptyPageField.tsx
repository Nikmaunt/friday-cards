import s from "./Packs.module.css";
import { ReturnBack } from "../../common/returnBack/returnBack";
import PATH from "../../common/constans/path/path";
import { useAppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorPackName, selectorPackUserId } from "../cards/cardsSelectors";
import { SuperButton } from "../../common/superButton/superButton";
import { addNewCardTC } from "../cards/cardsReducer";
import { selectAppStatus, selectorPackId } from "../../app/appSelectors";
import Skeleton from "react-loading-skeleton";
import { selectorIdUser } from "../loginRegistration/selectors";
import { useState } from "react";
import { AddNewCardModal } from "../../common/modal/addNewCardModal";

export const EmptyPageField = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const packName = useSelector(selectorPackName);
  const packId = useSelector(selectorPackId);
  const statusApp = useSelector(selectAppStatus);
  const userAuthId = useSelector(selectorIdUser);
  const userPackId = useSelector(selectorPackUserId);

  const [activeAddNewCard, setActiveAddNewCard] = useState(false);

  const isUserCardPack = userAuthId === userPackId;
  const returnToPackHandler = () => {
    navigate(PATH.PACKS);
  };

  // const addNewCardHandler = async () => {
  //   await dispatch(addNewCardTC(packId));
  // navigate(`${PATH.CARDS_LIST}${packId}`);
  // };

  const addNewPackModalHandler = async () => {
    setActiveAddNewCard(true);
  };

  return (
    <div className={s.emptyPageWrapper}>
      <ReturnBack callback={returnToPackHandler} />
      <h3 className={s.titleEmptyPage}>{packName}</h3>
      {statusApp === "loading" ? (
        <Skeleton height={"60px"} count={5} background-color="#f3f3f3" foreground-color="#ecebeb" />
      ) : (
        <div className={s.textEmptyContainer}>
          {isUserCardPack ? <p>This pack is empty.Click add new card to fill this pack</p> : <p>This pack is empty.</p>}
          <div className={s.emptyPageButton}>
            {/*{isUserCardPack && <SuperButton name={"Add new card"} callback={addNewCardHandler} />}*/}
            {isUserCardPack && <SuperButton name={"Add new card"} callback={addNewPackModalHandler} />}
          </div>
          <AddNewCardModal active={activeAddNewCard} setActive={setActiveAddNewCard} pack_id={packId} />
        </div>
      )}
    </div>
  );
};
