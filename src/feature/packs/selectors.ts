import { RootReducerType, useAppSelector } from "../../app/store";

export const selectorRowsPerPage = (state: RootReducerType) => state.packs.pageCount;
export const selectorPage = (state: RootReducerType) => state.packs.page;
export const packs = (state: RootReducerType) => state.packs;
export const userId = (state: RootReducerType) => state.auth.user._id;
// export const packs = (state: RootReducerType) => state.packs;
