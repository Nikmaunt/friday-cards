import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux";
import { appReducer } from "./appReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { authReducer } from "../feature/loginRegistration/authReducer";
import { forgotPasswordReducer } from "../feature/passwordRecovery/forgotPasswordReducer";
import { packsReducer } from "../feature/packs/packsReducer";
import { cardsReducer } from "../feature/cards/cardsReducer";
import { loadState, saveState } from "../common/functions/localStorage/localStorage";

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  recoveryPassword: forgotPasswordReducer,
  cards: cardsReducer,
  packs: packsReducer,
});

//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = createStore(rootReducer, loadState(), applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  saveState({
    app: store.getState().app,
    auth: store.getState().auth,
    recoveryPassword: store.getState().recoveryPassword,
    cards: store.getState().cards,
    packs: store.getState().packs,
    //settings: store.getState().settings,
  });
});

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector;

////types
export type RootReducerType = ReturnType<typeof rootReducer>;
export type AppThunkDispatch = ThunkDispatch<RootReducerType, any, AnyAction>;

// @ts-ignore
window.store = store;
