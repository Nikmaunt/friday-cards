import { AppThunkDispatch, RootReducerType } from "../../app/store";
import { setAppStatus, setIsInitialized } from "../../app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "../../utils/errorUtils/errorUtils";
import { CardResponseType, cardsAPI, NewCardRequestType } from "./cardsAPI";

// const initialCardsState = {
//     cards: [] ,
//     cardsTotalCount: 0,
//     maxGrade: 0,
//     minGrade: 0,
//     packCreated: '',
//     packName: '',
//     packPrivate: false,
//     packUpdated: '',
//     packUserId: '',
//     page: 1,
//     pageCount: 1,
//     token: '',
//     tokenDeathTime: ''
// } ;

const initialCardsState = {} as CardResponseType;

export const cardsReducer = (state = initialCardsState, action: CardsActionCreatorsType): CardResponseType => {
  switch (action.type) {
    case CardsActions.SetCards:
      return { ...action.payload.cards };
    case CardsActions.GetCards:
      return { ...action.payload.cards };
    // case CardsActions.AddCard:
    //     return { ...state,... action.payload.card};
    default:
      return state;
    //
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
export const setCards = (cards: CardResponseType) => {
  return {
    type: CardsActions.SetCards,
    payload: {
      cards,
    },
  } as const;
};
export const addCard = (card: any) => {
  return {
    type: CardsActions.AddCard,
    payload: {
      card,
    },
  } as const;
};

/////////////////// THUNK CREATORS ////////////////////////
export const getUserCards = (packID: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    await cardsAPI.getCards(packID);
    const res = await cardsAPI.getCards(packID);
    console.log("res cards", res);
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
export const setUserCards = (id: string) => async (dispatch: AppThunkDispatch, getState: () => RootReducerType) => {
  // dispatch(setAppStatus("loading"));
  try {
    await cardsAPI.getCards(id);
    const res = await cardsAPI.getCards(id);
    dispatch(setCards(res.data));
    console.log(res.data);
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    // dispatch(setIsInitialized(true));
    // dispatch(setAppStatus("succeeded"));
  }
};
export const addNewCardTC = (id: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));

  const newCard: NewCardRequestType = {
    card: {
      cardsPack_id: id,
      question: "Do you work?",
      answer: "YES",
    },
  };
  console.log("newCARD", newCard);
  try {
    // await cardsAPI.addCard(newCard); //
    const res = await cardsAPI.addCard(newCard); //
    await dispatch(addCard(newCard)); //
    //await cardsAPI.getCards(id);
    //dispatch(getUserCards(id));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    // dispatch(setIsInitialized(true));
    dispatch(setAppStatus("succeeded"));
  }
};

// export const createNewCard = (packID:string) => async (dispatch: AppThunkDispatch) => {
//     dispatch(setAppStatus("loading"));
//     try {
//         await cardsAPI.addCard(packID);
//         const res =  await cardsAPI.addCard(packID);
//         dispatch(addCard(res.data.cards));
//         console.log(res.data.cards)
//     } catch (e) {
//         const err = e as Error | AxiosError<{ error: string }>;
//         errorUtils(err, dispatch);
//     } finally {
//         dispatch(setIsInitialized(true));
//         dispatch(setAppStatus("succeeded"));
//     }
// };

//////////// types //////////////

export const CardsActions = {
  GetCards: "GET-CARDS",
  SetCards: "SET-CARDS",
  AddCard: "ADD-CARD",
} as const;

export type CardsActionCreatorsType = ReturnType<typeof getCards> | ReturnType<typeof setCards>;
