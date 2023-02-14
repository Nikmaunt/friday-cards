import { AppThunkDispatch } from "../../app/store";
import { setAppStatus, setIsInitialized, toggleIsSignUp } from "../../app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "../../utils/errorUtils/errorUtils";
import {cardsAPI, CardsReturnType} from "./cardsAPI";


const initialCardsState = {} as CardsReturnType;

export const cardsReducer = (state = initialCardsState, action:CardsActionCreatorsType): InitialCardsStateType => {
    switch (action.type) {
        case CardsActions.GetCards:
            return { ...state,...action.payload.cards};
        default:
            return state ;
        //
    }
};

/////////////////// ACTION CREATORS ///////////////////////

export const getCards = (cards:any) => {
    return {
        type: CardsActions.GetCards,
        payload: {
            cards,
        },
    } as const;
};

/////////////////// THUNK CREATORS ////////////////////////


export const getUserCards = (packID:any) => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatus("loading"));
    try {
        await cardsAPI.getCards(packID);
        const res =  await cardsAPI.getCards(packID);
        dispatch(getCards(res.data.cards));
        console.log(res.data.cards)
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>;
        errorUtils(err, dispatch);
    } finally {
        dispatch(setIsInitialized(true));
        dispatch(setAppStatus("succeeded"));
    }
};

//////////// types //////////////

type InitialCardsStateType = typeof initialCardsState;

export const CardsActions  = {
    GetCards : "GET-CARDS",
}


export type CardsActionCreatorsType = ReturnType<typeof getCards>;

export type UserDataType = {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error: string;
};
