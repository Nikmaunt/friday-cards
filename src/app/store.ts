import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux";
import { appReducer } from "./appReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunkMiddleware, { ThunkDispatch, ThunkAction } from "redux-thunk";
import { authReducer } from "../common/loginRegistration/authReducer";
import { ForgotPasswordActionsType } from "../state/forgotPassword-reducer";
import {profileReducer} from "../feature/profile/profileReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
export const persistor = persistStore(store)
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector;

////types
export type RootReducerType = ReturnType<typeof rootReducer>;
export type AppThunkDispatch = ThunkDispatch<RootReducerType, any, AnyAction>;

export type AppActionsType = ForgotPasswordActionsType;
//thunkType
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootReducerType,
  unknown,
  AppActionsType
>;

// @ts-ignore
window.store = store;
