import {AppThunkDispatch} from "../../app/store";
import {profileAPI} from "./img/profileAPI";
import {AxiosError} from "axios/index";
import {errorUtils} from "../../utils/errorUtils/errorUtils";

const initialState : InitialStateType = {
   name: ''
};

export const profileReducer = (state =  initialState, action: ActionsType) : InitialStateType    => {
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
                dispatch(updateUserNameAC(name))
            }
        })
        .catch((e) => {
            const err = e as Error | AxiosError<{ error: string }>;
            errorUtils(err, dispatch);
        })
}


//////////// types //////////////

export type InitialStateType = {
    name: string
};

type ActionsType =
    | ReturnType<typeof updateUserNameAC
>
