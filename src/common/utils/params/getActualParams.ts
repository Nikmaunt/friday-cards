import {PackParamsType} from "../../../feature/packs/packsReducer";

export const getActualPacksParams = (searchParams: URLSearchParams): PackParamsType => {
  return {
    user_id: searchParams.get("user_id") || undefined,
    packName: searchParams.get("packName") || undefined,
    min: Number(searchParams.get("min")) || undefined,
    max: Number(searchParams.get("max")) || undefined,
    sortPacks: searchParams.get("sortPacks") || undefined,
    page: Number(searchParams.get("page")) || undefined,
    pageCount: Number(searchParams.get("pageCount")) || 1,
    block: Boolean(searchParams.get("block")) || false,
  };
};
