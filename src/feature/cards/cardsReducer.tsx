import {AppThunkDispatch, RootReducerType} from "../../app/store";
import { setAppStatus, setIsInitialized, toggleIsSignUp } from "../../app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "../../utils/errorUtils/errorUtils";
import {cardsAPI, CardsReturnType} from "./cardsAPI";


const initialCardsState = {} as CardsReturnType;

export const cardsReducer = (state = initialCardsState, action:any): InitialCardsStateType => {
    switch (action.type) {
        case CardsActions.GetCards:
            return {...state, _id:action.payload.packID};
        case CardsActions.SetCards:
            return {...action.payload.cards};
        // case CardsActions.AddCard:
        //     return { ...state,... action.payload.card};
        default:
            return state ;
        //
    }
};

/////////////////// ACTION CREATORS ///////////////////////

export const getCards = (packID:any) => {
    return {
        type: CardsActions.GetCards,
        payload: {
            packID,
        },
    } as const;
};
export const setCards = (cards:any) => {
    return {
        type: CardsActions.SetCards,
        payload: {
            cards,
        },
    } as const;
};
export const addCard = (card:any) => {
    return {
        type: CardsActions.SetCards,
        payload: {
            card,
        },
    } as const;
};


/////////////////// THUNK CREATORS ////////////////////////


export const getUserCards = (packID:any) => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatus("loading"));
    try {
        await cardsAPI.getCards(packID);
        const res = await cardsAPI.getCards(packID);
        dispatch(getCards(res.data.cards._id));
        console.log(res.data.cards._id)
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>;
        errorUtils(err, dispatch);
    } finally {
        dispatch(setIsInitialized(true));
        dispatch(setAppStatus("succeeded"));
    }
};

export const setUserCards = (id: string) => async (dispatch: AppThunkDispatch, getState: () => RootReducerType) => {
    dispatch(setAppStatus("loading"));
    try {
        //const {_id} = getState().cards
        await cardsAPI.getCards(id);
        const res =  await cardsAPI.getCards(id);
        dispatch(setCards(res.data.cards));
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>;
        errorUtils(err, dispatch);
    } finally {
        dispatch(setIsInitialized(true));
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

type InitialCardsStateType = typeof initialCardsState;

export const CardsActions  = {
    GetCards : "GET-CARDS",
    SetCards: "SET-CARDS",
    AddCard:"ADD-CARD"
}


export type CardsActionCreatorsType = ReturnType<typeof getCards> | ReturnType<typeof setCards>;


