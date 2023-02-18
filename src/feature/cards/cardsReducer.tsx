import { AppThunkDispatch } from "../../app/store";
import { setAppStatus, setCurrentPackId, setIsInitialized } from "../../app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "../../utils/errorUtils/errorUtils";
import { CardResponseType, cardsAPI, NewCardRequestType } from "./cardsAPI";
import { fetchPacksTC } from "../packs/packsReducer";

const initialCardsState = {} as CardResponseType;

export const cardsReducer = (state = initialCardsState, action: CardsActionCreatorsType): CardResponseType => {
  switch (action.type) {
    case CardsActions.GetCards:
      return { ...action.payload.cards };
    default:
      return state;
  }
};

/////////////////// ACTION CREATORS ///////////////////////
export const getCards = (cards: CardResponseType) => {
  return {
    type: CardsActions.GetCards,
    payload: {
      cards,
    },
  } as const;
};

/////////////////// THUNK CREATORS ////////////////////////
export const getUserCardByPackId = (packID: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    await cardsAPI.getCards(packID);
    const res = await cardsAPI.getCards(packID);
    console.log("res cards", res);
    dispatch(setCurrentPackId(packID));
    dispatch(getCards(res.data));
    console.log(res.data);
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setIsInitialized(true));
    dispatch(setAppStatus("succeeded"));
  }
};

export const addNewCardTC = (id: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  const newCard: NewCardRequestType = {
    card: {
      cardsPack_id: id,
      question: "Do you work?",
      answer: "New",
    },
  };
  console.log("newCARD", newCard);
  try {
    await cardsAPI.addCard(newCard);
    await dispatch(getUserCardByPackId(id));
    dispatch(fetchPacksTC({}));
    //await cardsAPI.getCards(id);
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    // dispatch(setIsInitialized(true));
    dispatch(setAppStatus("succeeded"));
  }
};

//////////// types //////////////

export const CardsActions = {
  GetCards: "GET-CARDS",
} as const;

export type CardsActionCreatorsType = ReturnType<typeof getCards>;
