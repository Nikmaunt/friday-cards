import { RootReducerType } from "../../app/store";

export const selectorRowsPerPage = (state: RootReducerType) => state.packs.pageCount;
export const selectorPage = (state: RootReducerType) => state.packs.page;
export const selectorPacks = (state: RootReducerType) => state.packs;
export const selectorPackName = (state: RootReducerType) => state.packs.params.packName;
export const selectorMinn = (state: RootReducerType) => state.packs.minCardsCount;
export const selectorMaxxx = (state: RootReducerType) => state.packs.maxCardsCount;
export const selectorMin = (state: RootReducerType) => state.packs.params.min;
export const selectorMax = (state: RootReducerType) => state.packs.params.max;
export const selectorPacksTotalCount = (state: RootReducerType) => state.packs.cardPacksTotalCount;
export const selectorIsClearSearchField = (state: RootReducerType) => state.packs.isClearSearchField;
export const selectorIsActiveMyPacks = (state: RootReducerType) => state.packs.isActiveMyPacks;
