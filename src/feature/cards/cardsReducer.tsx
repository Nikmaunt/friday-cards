import { AppThunkDispatch } from "../../app/store";
import { setAppStatus, setIsInitialized, toggleIsSignUp } from "../../app/appReducer";
import { AxiosError } from "axios";
import { errorUtils } from "../../utils/errorUtils/errorUtils";
import {profileAPI} from "../../feature/profile/profileAPI";
import {cardsAPI} from "./cardsAPI";


const initialCardsState = {
    cards: []
};

export const cardsReducer = (state = initialCardsState, action:CardsActionCreatorsType): InitialCardsStateType => {
    switch (action.type) {
        case CardsActions.GetCards:
            return { ...state, cards: action.payload.packID};
        default:
            return state;
        //
    }
};

/////////////////// ACTION CREATORS ///////////////////////

export const getCards = (packID:any) => {
    return {
        type: CardsActions.GetCards,
        payload: {
            packID
        }
    } as const;
};

/////////////////// THUNK CREATORS ////////////////////////


export const getUserCards = (packID:string) => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatus("loading"));
    try {
        await cardsAPI.getCards(packID);
        const res =  await cardsAPI.getCards(packID);
        dispatch(getCards(packID));
        // console.log(res)
        console.log(cardsAPI)
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
