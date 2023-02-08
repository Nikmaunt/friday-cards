import {AppThunkDispatch, RootReducerType} from "../../app/store";
import {Dispatch} from "react";
import {profileAPI} from "./img/profileAPI";

const initialAuthState : InitialAuthStateType = {
   name: ''
};

export const profileReducer = (state = initialAuthState, action: ActionsType) : InitialAuthStateType    => {
    switch (action.type) {
        case 'UPDATE-USER-NAME':
            return {...state, name: action.name}
        default:
            return state;
        //
    }
};

// actions

export const updateUserNameAC = (name:string) => ({type: 'UPDATE-USER-NAME', name} as const)

/////////////////// THUNK CREATORS ////////////////////////

export const updateUser = (name:string) => (dispatch: AppThunkDispatch) => {
    profileAPI.updateUserName(name)
        .then(res => {
            if (res.status === 200) {
                console.log(res+'userNew');
                dispatch(updateUserNameAC(name))
            }
        })
        .catch((error) => {
            console.log(error);
        })
}


//////////// types //////////////

export type InitialAuthStateType = {
    name: any
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
    | ReturnType<typeof updateUserNameAC
>
