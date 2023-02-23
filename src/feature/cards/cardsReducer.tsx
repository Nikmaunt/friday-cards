import {AppThunkDispatch, RootReducerType} from "../../app/store";
import { setAppStatus, setCurrentPackId, setIsInitialized } from "../../app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "../../utils/errorUtils/errorUtils";
import { CardResponseType, cardsAPI, NewCardRequestType } from "./cardsAPI";
import {authMe} from "../loginRegistration/authReducer";

const initialCardsState = {} as CardResponseType;

export const cardsReducer = (state = initialCardsState, action: CardsActionCreatorsType): CardResponseType => {
  switch (action.type) {
    case CardsActions.GetCards:
      return { ...action.payload.cards };
    case CardsActions.SetPageCount:
      return {...state, pageCount: action.payload.pageCount}
    case CardsActions.SetCardsPageNumber:
      return {...state, page: action.payload.page}
    case CardsActions.SetCardShot:
      console.log(action.payload.grade , action.payload.cardID, "STATE CARDS")
      let copyState = state
      return {...copyState,  cards: {...copyState.cards.map(el=> el._id === action.payload.cardID ? {...el,...action.payload.grade  } : el)} }
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
export const SetCardShot = (grade: any, cardID:string) => {
  return {
    type: CardsActions.SetCardShot,
    payload: {
      grade,
      cardID
    },
  } as const;
};

/////////////////// THUNK CREATORS ////////////////////////
export const getUserCardByPackId =
  (packID: string) => async (dispatch: AppThunkDispatch, getState: () => RootReducerType) => {
    dispatch(setAppStatus("loading"));
    const { page, pageCount } = getState().cards;
    try {
      // await cardsAPI.getCards(packID,{page,pageCount});
      const res = await cardsAPI.getCards(packID, { page, pageCount });
      console.log("res cards", res);
      dispatch(setCurrentPackId(packID));
      dispatch(getCards(res.data));
      console.log(res.data);
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      errorUtils(err, dispatch);
    } finally {
      dispatch(setIsInitialized(true));
      dispatch(setAppStatus("idle"));
    }
  };

export const getAllUserCards =
    (packID: string) => async (dispatch: AppThunkDispatch, getState: () => RootReducerType) => {

      dispatch(setAppStatus("loading"));
      let pageCount = getState().cards.cardsTotalCount === undefined ? 50 : getState().cards.cardsTotalCount
      console.log(pageCount, 'PAGE COUNT')
      try {
        const res = await cardsAPI.getCards(packID, {pageCount});
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
export const updateUserCard =
    (grade:number, cardId:string) => async (dispatch: AppThunkDispatch, getState: () => RootReducerType) => {
      dispatch(setAppStatus("loading"));
      const cards = getState().cards
      try {
        await cardsAPI.udpateCard(grade,cardId );

        dispatch(getCards(cards));

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
  SetCardsPageNumber: "SET-PAGE-NUMBER",
  SetPageCount: "SET-PAGE-COUNT",
  SetCardShot:"SET-CARD-SHOT"
} as const;

export type CardsActionCreatorsType =
  | ReturnType<typeof getCards>
  | ReturnType<typeof SetCardsPageCount>
  | ReturnType<typeof SetCardsPageNumber>
  | ReturnType<typeof SetCardShot>;