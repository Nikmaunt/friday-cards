import {AppThunkDispatch, RootReducerType} from "../../app/store";
import { setAppStatus, setIsInitialized} from "../../app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "../../utils/errorUtils/errorUtils";
import {CardResponseType, cardsAPI} from "./cardsAPI";


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

const initialCardsState = {} as CardResponseType ;


export const cardsReducer = (state = initialCardsState, action: CardsActionCreatorsType): InitialCardsStateType => {
    switch (action.type) {
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

export const setUserCards = (id: string) => async (dispatch: AppThunkDispatch, getState: () => RootReducerType) => {
    dispatch(setAppStatus("loading"));
    try {
        await cardsAPI.getCards(id);
        const res =  await cardsAPI.getCards(id);
        dispatch(setCards(res.data.cards));
        console.log(res.data)
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
    SetCards: "SET-CARDS",
    AddCard:"ADD-CARD"
}

export type CardsActionCreatorsType = ReturnType<typeof setCards> ;


