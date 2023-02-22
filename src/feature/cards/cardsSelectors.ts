import { RootReducerType } from "../../app/store";

export const selectorCards = (state: RootReducerType) => state.cards.cards;

export const selectorPackUserId = (state: RootReducerType) => state.cards.packUserId;
export const selectorPackName = (state: RootReducerType) => state.cards.packName;
export const selectorCardsPage = (state: RootReducerType) => state.cards.pageCount
export const selectorCardsPageNumber = (state: RootReducerType) => state.cards.page
export const selectorCardsTotalCount = (state: RootReducerType) => state.cards.cardsTotalCount
