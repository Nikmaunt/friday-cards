import {AppThunkDispatch, RootReducerType} from "../../app/store";
import { setAppStatus, setCurrentPackId, setIsInitialized } from "../../app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "../../utils/errorUtils/errorUtils";
import {CardResponseType, cardsAPI, CardsType, NewCardRequestType} from "./cardsAPI";
import { fetchPacksTC } from "../packs/packsReducer";

const initialCardsState = {} as CardResponseType;

export const cardsReducer = (state = initialCardsState, action: CardsActionCreatorsType): CardResponseType => {
  switch (action.type) {
    case CardsActions.GetCards:
      return { ...action.payload.cards };
    case CardsActions.SetPageCount:
      return {...state, pageCount: action.payload.pageCount}
    case CardsActions.SetCardsPageNumber:
      return {...state, pageCount: action.payload.page}
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
export const SetCardsPageCount = (pageCount: number) => {
  return {
    type: CardsActions.SetPageCount,
    payload: {
      pageCount,
    },
  } as const;
};
export const SetCardsPageNumber = (page: number) => {
  return {
    type: CardsActions.SetCardsPageNumber,
    payload: {
      page,
    },
  } as const;
};

/////////////////// THUNK CREATORS ////////////////////////
export const getUserCardByPackId = (packID: string) => async (dispatch: AppThunkDispatch,  getState: () => RootReducerType) => {
  dispatch(setAppStatus("loading"));
  const {page, pageCount} = getState().cards
  try {
    // await cardsAPI.getCards(packID);
    const res = await cardsAPI.getCards(packID,{page,pageCount});
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

// export const setUserCards = (id?: string) => async (dispatch: AppThunkDispatch, getState: () => RootReducerType) => {
//   const {page, pageCount} = getState().cards
//   // dispatch(setAppStatus("loading"));
//   if(id) {
//     try {
//       const res = await cardsAPI.setCards(id,{page,pageCount});
//       dispatch(setCards(res.data));
//       console.log(res.data.cards + ' SERCARDS');
//     } catch (e) {
//       const err = e as Error | AxiosError<{ error: string }>;
//       errorUtils(err, dispatch);
//     } finally {
//       // dispatch(setIsInitialized(true));
//       // dispatch(setAppStatus("succeeded"));
//     }
//   }
// };




//////////// types //////////////

export const CardsActions = {
  GetCards: "GET-CARDS",
  SetCardsPageNumber: "SET-PAGE-NUMBER",
  SetPageCount: "SET-PAGE-COUNT"
} as const;

export type CardsActionCreatorsType = ReturnType<typeof getCards>| ReturnType<typeof SetCardsPageCount>| ReturnType<typeof SetCardsPageNumber>
