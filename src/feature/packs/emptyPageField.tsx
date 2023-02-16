import s from "./Packs.module.css";
import { ReturnBack } from "../../common/returnBack/returnBack";
import { fetchPacksTC } from "./packsReducer";
import PATH from "../../common/constans/path/path";
import { useAppDispatch } from "../../app/store";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorCards, selectorPackName, selectorPackUserId } from "../cards/cardsSelectors";
import { SuperButton } from "../../common/superButton/superButton";
import { addNewCardTC } from "../cards/cardsReducer";
import { selectorPacks, selectorPacksCards, selectorPacksId, selectorUserId } from "./selectors";

export const EmptyPageField = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const packName = useSelector(selectorPackName);
  const userAuthId = useSelector(selectorUserId);
  const userCards = useSelector(selectorCards);
  const userPacks = useSelector(selectorPacksCards);
  const userPackId = useSelector(selectorPacksId);
  // const userPackId = useSelector(selectorPacksId);
  console.log("userPAcks", userPacks);
  let cardsPackId: string = "63eeab996d7ebe0eca61d3e8";
  userPacks.forEach((el) => {
    if (el.user_id === userAuthId && el._id === userPackId) {
      cardsPackId = el._id;
    }
  });
  console.log(cardsPackId);

  const returnToPackHandler = async () => {
    console.log("work");
    await dispatch(fetchPacksTC({}));
    // return <Navigate to={PATH.PACKS} />;
    navigate(PATH.PACKS);
  };
  const addNewCardHandler = async () => {
    await dispatch(addNewCardTC(cardsPackId));
    navigate(PATH.PACKS); // временно
  };
  return (
    <div className={s.emptyPageWrapper}>
      <ReturnBack callback={returnToPackHandler} />
      <h3 className={s.titleEmptyPage}>{packName}</h3>
      <div className={s.textEmptyContainer}>
        <p>This pack is empty.Click add new card to fill this pack</p>
        <div className={s.emptyPageButton}>
          <SuperButton name={"Add new card"} callback={addNewCardHandler} />
        </div>
      </div>
    </div>
  );
};
