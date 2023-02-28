import { AppThunkDispatch, RootReducerType } from "../../app/store";
import { setAppStatus, setCurrentPackId } from "../../app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "../../utils/errorUtils/errorUtils";
import { CardParamsType, cardsAPI, CardsType, NewCardRequestType } from "./cardsAPI";

const initialCardsState = {} as CardStateType;

// const initialCardsState = {
//     cards: [],
//     params: {
//         cardAnswer: "",
//         cardQuestion: "",
//         cardsPack_id: "",
//         min: 0,
//         max: 0,
//         sortCards: "0grade",
//         page: 1,
//         pageCount: 4,
//     },
//     cardsTotalCount: 0,
//     maxGrade: 0,
//     minGrade: 0,
//     packCreated: '',
//     packName: '',
//     packPrivate: false,
//     packUpdated: '',
//     packUserId: '',
//     page: 1,
//     pageCount: 4,
//     token: '',
//     tokenDeathTime: '',
// };

export const cardsReducer = (state = initialCardsState, action: CardsActionCreatorsType): CardStateType => {
  switch (action.type) {
    case CardsActions.GetCards:
      return { ...action.payload.cards };
    default:
      return state;
  }
};

/////////////////// ACTION CREATORS ///////////////////////
export const getCards = (cards: CardStateType) => {
  return {
    type: CardsActions.GetCards,
    payload: {
      cards,
    },
  } as const;
};

// export const deleteCard = (id: string) => {
//   return {
//     type: CardsActions.DeleteCard,
//     payload: {
//       id,
//     },
//   };
// };

/////////////////// THUNK CREATORS ////////////////////////

export const getUserCardByPackId = (params: CardParamsType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    const res = await cardsAPI.getCards(params);
    console.log({ res });
    dispatch(getCards(res.data));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("idle"));
  }
};

export const getAllUserCards =
  (packID: string) => async (dispatch: AppThunkDispatch, getState: () => RootReducerType) => {
    dispatch(setAppStatus("loading"));
    let pageCount = getState().cards.cardsTotalCount === undefined ? 50 : getState().cards.cardsTotalCount;
    try {
      //const res = await cardsAPI.getCards(packID, { pageCount });
      dispatch(setCurrentPackId(packID));
      //dispatch(getCards(res.data));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      errorUtils(err, dispatch);
    } finally {
      dispatch(setAppStatus("succeeded"));
    }
  };

export const updateUserCard =
  (grade: number, cardId: string) => async (dispatch: AppThunkDispatch, getState: () => RootReducerType) => {
    dispatch(setAppStatus("loading"));
    const cards = getState().cards;
    try {
      await cardsAPI.updateCard(grade, cardId);
      dispatch(getCards(cards));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      errorUtils(err, dispatch);
    } finally {
      dispatch(setAppStatus("succeeded"));
    }
  };

export const addNewCardTC = (id: string, question: string, answer: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  const newCard: NewCardRequestType = {
    card: {
      cardsPack_id: id,
      question: question,
      answer: answer,
    },
  };
  try {
    await cardsAPI.addCard(newCard);
    //await dispatch(getUserCardByPackId(id));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const deleteCardTC = (card_id: string, pack_id: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatus("loading"));
  try {
    await cardsAPI.deleteCard(card_id);
    //await dispatch(getUserCardByPackId(pack_id));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    errorUtils(err, dispatch);
  } finally {
    dispatch(setAppStatus("succeeded"));
  }
};

export const editCardTC =
  (pack_id: string, card_id: string, question: string, answer: string) => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatus("loading"));
    const editCard: editCardType = {
      card: {
        _id: card_id,
        question,
        answer,
      },
    };
    try {
      await cardsAPI.editCard(editCard);
      //await dispatch(getUserCardByPackId(pack_id));
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      errorUtils(err, dispatch);
    } finally {
      dispatch(setAppStatus("succeeded"));
    }
  };

//////////// types //////////////

export type CardStateType = {
  cards: CardsType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  packCreated: string;
  packName: string;
  packPrivate: boolean;
  packUpdated: string;
  packUserId: string;
  page: number;
  pageCount: number;
  token: string;
  tokenDeathTime: string;
};

export const CardsActions = {
  GetCards: "GET-CARDS",
  // SetCardsPageNumber: "SET-PAGE-NUMBER",
  // SetPageCount: "SET-PAGE-COUNT",
  // SetParams: "SET_PARAMS",
  // DeleteCard: "DELETE-CARD",
} as const;

export type CardsActionCreatorsType = ReturnType<typeof getCards>;

export type editCardType = {
  card: {
    _id: string;
    question: string;
    answer: string;
  };
};
