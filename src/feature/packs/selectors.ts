import { RootReducerType } from "../../app/store";

export const selectorRowsPerPage = (state: RootReducerType) => state.packs.pageCount;
export const selectorPage = (state: RootReducerType) => state.packs.page;
