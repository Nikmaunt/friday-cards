import { RootReducerType, useAppSelector } from "../../app/store";

export const selectorRowsPerPage = (state: RootReducerType) => state.packs.pageCount;
export const selectorPage = (state: RootReducerType) => state.packs.page;
export const selectorPacks = (state: RootReducerType) => state.packs;
export const selectorUserId = (state: RootReducerType) => state.auth.user._id;
//export const packs = (state: RootReducerType) => state.packs;
