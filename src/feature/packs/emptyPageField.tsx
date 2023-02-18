import s from "./Packs.module.css";
import { ReturnBack } from "../../common/returnBack/returnBack";
import PATH from "../../common/constans/path/path";
import { useAppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorPackName } from "../cards/cardsSelectors";
import { SuperButton } from "../../common/superButton/superButton";
import { addNewCardTC } from "../cards/cardsReducer";
import { selectorPackId } from "../../app/appSelectors";

export const EmptyPageField = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const packName = useSelector(selectorPackName);
  const packId = useSelector(selectorPackId);

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
      <div className={s.textEmptyContainer}>
        <p>This pack is empty.Click add new card to fill this pack</p>
        <div className={s.emptyPageButton}>
          <SuperButton name={"Add new card"} callback={addNewCardHandler} />
        </div>
      </div>
    </div>
  );
};
