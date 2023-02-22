import s from "./Packs.module.css";
import { ReturnBack } from "../../common/returnBack/returnBack";
import PATH from "../../common/constans/path/path";
import { useAppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {selectorPackName, selectorPackUserId} from "../cards/cardsSelectors";
import { SuperButton } from "../../common/superButton/superButton";
import { addNewCardTC } from "../cards/cardsReducer";
import {selectorUserId} from "./packsSelectors";
import { selectAppStatus, selectorPackId } from "../../app/appSelectors";
import Skeleton from "react-loading-skeleton";

export const EmptyPageField = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const packName = useSelector(selectorPackName);
  const packId = useSelector(selectorPackId);
  const userAuthId = useSelector(selectorUserId);
  const userPackId = useSelector(selectorPackUserId);
  const statusApp = useSelector(selectAppStatus);

  const isUserCardPack = userAuthId === userPackId
  const returnToPackHandler = () => {
    navigate(PATH.PACKS);
  };

  const addNewCardHandler = async () => {
    await dispatch(addNewCardTC(packId));
    navigate(`${PATH.CARDS_LIST}${packId}`);
  };
  return (
    <div className={s.emptyPageWrapper}>
      <ReturnBack callback={returnToPackHandler} />
      <h3 className={s.titleEmptyPage}>{packName}</h3>

      {statusApp === "loading" ? (
        <Skeleton height={"60px"} count={5} background-color="#f3f3f3" foreground-color="#ecebeb" />
      ) : (
        <div className={s.textEmptyContainer}>
          <p>This pack is empty.Click add new card to fill this pack</p>
          <div className={s.emptyPageButton}>
            <SuperButton name={"Add new card"} callback={addNewCardHandler} />
          </div>
        </div>
      ) }
    </div>
  );
};
// return (
//     <div className={s.emptyPageWrapper}>
//       <ReturnBack callback={returnToPackHandler} />
//       <h3 className={s.titleEmptyPage}>{packName}</h3>
//       { isUserCardPack === true ?
//           <div className={s.textEmptyContainer}>
//             <p>This pack is empty.Click add new card to fill this pack</p>
//             <div className={s.emptyPageButton}>
//               <SuperButton name={"Add new card"} callback={addNewCardHandler} />
//             </div>
//           </div> :
//           <div className={s.textEmptyContainer}>
//             <p>This pack is empty.</p>
//           </div>
//       }
//     </div>
// );