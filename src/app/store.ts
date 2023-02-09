import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux";
import { appReducer } from "./appReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunkMiddleware, { ThunkDispatch, ThunkAction } from "redux-thunk";
import { authReducer } from "../common/loginRegistration/authReducer";
import { ForgotPasswordActionsType } from "../state/forgotPassword-reducer";

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector;

////types
export type RootReducerType = ReturnType<typeof rootReducer>;
export type AppThunkDispatch = ThunkDispatch<RootReducerType, any, AnyAction>;

export type AppActionsType = ForgotPasswordActionsType;
//thunkType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootReducerType, unknown, AppActionsType>;

// @ts-ignore
window.store = store;
