import s from "./Packs.module.css";
import { ReturnBack } from "../../common/returnBack/returnBack";
import PATH from "../../common/constans/path/path";
import { useAppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {selectorPackName, selectorPackUserId} from "../cards/cardsSelectors";
import { SuperButton } from "../../common/superButton/superButton";
import { addNewCardTC } from "../cards/cardsReducer";
import { selectorPackId } from "../../app/appSelectors";
import {selectorUserId} from "./packsSelectors";

export const EmptyPageField = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const packName = useSelector(selectorPackName);
  const packId = useSelector(selectorPackId);
  const userAuthId = useSelector(selectorUserId);
  const userPackId = useSelector(selectorPackUserId);

  const isUserCardPack = userAuthId === userPackId
  const returnToPackHandler = () => {
    navigate(PATH.PACKS);
  };

  const addNewCardHandler = async () => {
    await dispatch(addNewCardTC(packId));
    navigate(PATH.PACKS);
  };

  return (
      <div className={s.emptyPageWrapper}>
        <ReturnBack callback={returnToPackHandler} />
        <h3 className={s.titleEmptyPage}>{packName}</h3>
        { isUserCardPack === true ?
            <div className={s.textEmptyContainer}>
              <p>This pack is empty.Click add new card to fill this pack</p>
              <div className={s.emptyPageButton}>
                <SuperButton name={"Add new card"} callback={addNewCardHandler} />
              </div>
            </div> :
            <div className={s.textEmptyContainer}>
              <p>This pack is empty.</p>
            </div>
        }
      </div>
  );
};
