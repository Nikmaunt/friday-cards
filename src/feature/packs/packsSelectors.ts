import { RootReducerType } from "../../app/store";

export const selectorRowsPerPage = (state: RootReducerType) => state.packs.pageCount;
export const selectorPacks = (state: RootReducerType) => state.packs;

export const selectorIsClearSearchField = (state: RootReducerType) => state.packs.isClearSearchField;
