import {AppThunkDispatch, RootReducerType} from "../../app/store";
import {setAppStatus, setCurrentPackId, setIsInitialized} from "../../app/appReducer";
import {AxiosError} from "axios";
import {errorUtils} from "../../utils/errorUtils/errorUtils";
import {CardResponseType, cardsAPI, NewCardRequestType} from "./cardsAPI";


const initialCardsState = {} as CardResponseType;

export const cardsReducer = (state = initialCardsState, action: CardsActionCreatorsType): CardResponseType => {
    switch (action.type) {
        case CardsActions.GetCards:
            return {...action.payload.cards};
        case CardsActions.SetPageCount:
            return {...state, pageCount: action.payload.pageCount};
        case CardsActions.SetParams:
            return {...state, params: {...state.params, ...action.payload.params}};
        case CardsActions.SetCardsPageNumber:
            return {...state, page: action.payload.page};
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
export const deleteCard = (id: string) => {
    return {
        type: CardsActions.DeleteCard,
        payload: {
            id,
        },
    };
};
export const setCardsParams = (params: any) => {
    return {type: CardsActions.SetParams, payload: {params} as const};
};
/////////////////// THUNK CREATORS ////////////////////////
export const getUserCardByPackId =
    (packID: string) => async (dispatch: AppThunkDispatch, getState: () => RootReducerType) => {
        dispatch(setAppStatus("loading"));
        const {params} = getState().cards;
        console.log(params,'params')
        try {
            // await cardsAPI.getCards(packID,{page,pageCount});
            const res = await cardsAPI.getCards(packID, {params});
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
    (grade: number, cardId: string) => async (dispatch: AppThunkDispatch, getState: () => RootReducerType) => {
        dispatch(setAppStatus("loading"));
        const cards = getState().cards
        try {
            await cardsAPI.udpateCard(grade, cardId);
            dispatch(getCards(cards));
        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>;
            errorUtils(err, dispatch);
        } finally {
            dispatch(setIsInitialized(true));
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
    console.log("newCARD", newCard);
    try {
        await cardsAPI.addCard(newCard);
        await dispatch(getUserCardByPackId(id));
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
        await dispatch(getUserCardByPackId(pack_id));
        //await cardsAPI.getCards(id);
        //await cardsAPI.getCards(id);
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>;
        errorUtils(err, dispatch);
    } finally {
        // dispatch(setIsInitialized(true));
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
            await dispatch(getUserCardByPackId(pack_id));
        } catch (e) {
            const err = e as Error | AxiosError<{ error: string }>;
            errorUtils(err, dispatch);
        } finally {
            dispatch(setAppStatus("succeeded"));
        }
    };

//////////// types //////////////

export const CardsActions = {
    GetCards: "GET-CARDS",
    SetCardsPageNumber: "SET-PAGE-NUMBER",
    SetPageCount: "SET-PAGE-COUNT",
    SetParams: "SET_PARAMS",
    DeleteCard: "DELETE-CARD",
} as const;

export type CardsActionCreatorsType =
    | ReturnType<typeof getCards>
    | ReturnType<typeof SetCardsPageCount>
    | ReturnType<typeof setCardsParams>
    | ReturnType<typeof SetCardsPageNumber>;

export type editCardType = {
    card: {
        _id: string;
        question: string;
        answer: string;
    };
};
