import {AppThunkDispatch} from "../../app/store";
import {authAPI, LoginRequestType, RegistrationRequestType} from "./authAPI";
import {Dispatch} from "react";

const initialAuthState : InitialAuthStateType = {
    isAuth: false,
    userData: {}  as UserDataType

};

export const authReducer = (state = initialAuthState, action: ActionsType) : InitialAuthStateType    => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN':
            return {...state, isAuth: action.value, userData: action.data}
        default:
            return state;
        //
    }
};

// actions

export const setIsLoggedINAC = (value: boolean,data?:UserDataType) => ({type: 'SET-IS-LOGGED-IN', value,data} as const)

/////////////////// THUNK CREATORS ////////////////////////
export const registrateUser = (values: RegistrationRequestType) => async (dispatch: AppThunkDispatch) => {
    try {
        let res = await authAPI.registration(values);
        // console.log(res);
    } catch (e) {
    }
};

export const loginUser = (values: LoginRequestType) => async (dispatch: AppThunkDispatch) => {
    try {
        let res = await authAPI.login(values);
        if (res.status === 200) {
            dispatch(setIsLoggedINAC(true, res.data))
        }
        console.log(res.data);
    } catch (e) {
    }
};

export const logoutUser = () => (dispatch: AppThunkDispatch) => {
    authAPI.logout()
        .then(res => {
            if (res.status === 200) {
                dispatch(setIsLoggedINAC(false))
            }
        })
        .catch((error) => {
            console.log(error);
        })
}


//////////// types //////////////

export type InitialAuthStateType = {
    isAuth: boolean;
    userData?: UserDataType
};

export type UserDataType =  {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
// количество колод

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;
}


type ActionsType =
    | ReturnType<typeof setIsLoggedINAC>
