import { RootReducerType } from "../../app/store";

export const selectorRowsPerPage = (state: RootReducerType) => state.packs.pageCount;
export const selectorPage = (state: RootReducerType) => state.packs.page;
export const selectorPacks = (state: RootReducerType) => state.packs;
export const selectorPacksParams = (state: RootReducerType) => state.packs.params;
export const selectorMin = (state: RootReducerType) => state.packs.minCardsCount;
export const selectorMax = (state: RootReducerType) => state.packs.maxCardsCount;
export const selectorPacksTotalCount = (state: RootReducerType) => state.packs.cardPacksTotalCount;
export const selectorIsClearSearchField = (state: RootReducerType) => state.packs.isClearSearchField;
export const selectorIsActiveMyPacks = (state: RootReducerType) => state.packs.isActiveMyPacks;
