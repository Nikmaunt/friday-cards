import { instance } from "../../app/appAPI";

type GetPacksParamsType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string; // формат 0updated (0 или 1) и название критерия сортировки
  page?: number;
  pageCount?: number;
  user_id?: string;
  block?: boolean;
};
type AddPackParamsType = {
  name?: string;
  deckCover?: string;
};

//pack type from response
export type PackReturnType = {
  _id: string;
  user_id: string;
  user_name: string;
  name: string;
  private: boolean;
  path: string;
  grade: number;
  shots: number;
  cardsCount: number;
  deckCover?: string;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
};

export type AddPackResponseType = {
  newCardsPack: PackReturnType;
  token: string;
  tokenDeathTime: number;
};

//packsData object from response
export type PacksReturnType = {
  cardPacks: PackReturnType[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};

export const packsAPI = {
  getPacks(
    pageCount?: number,
    page?: number,
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: string, // формат 0updated (0 или 1) и название критерия сортировки
    user_id?: string,
    block?: boolean
  ) {
    const params: GetPacksParamsType = { pageCount, page, packName, min, max, sortPacks, user_id, block };
    return instance.get<PacksReturnType>("/cards/pack", { params });
  },
  addPack(name?: string, deckCover?: string) {
    const cardsPack: AddPackParamsType = { name, deckCover };
    return instance.post<AddPackResponseType>("/cards/pack", { cardsPack });
  },
};
