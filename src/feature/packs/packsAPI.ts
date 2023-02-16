import { instanceHeroku } from "../../app/appAPI";

export type GetPacksParamsType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string; // формат 0updated (0 или 1) и название критерия сортировки
  page?: number;
  pageCount?: number;
  user_id?: string;
  block?: boolean;
};
export type AddPackParamsType = {
  cardsPack: {
    name?: string;
    deckCover?: string;
    private?: boolean;
  };
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
export type EditCardPackRequestType = {
  cardsPack: {
    _id: string;
    name: string;
  };
};
export const packsAPI = {
  getPacks(params: GetPacksParamsType) {
    return instanceHeroku.get<PacksReturnType>("/cards/pack", { params });
  },
  addPack(newPack: AddPackParamsType) {
    return instanceHeroku.post<PackReturnType>("/cards/pack", newPack);
  },
  deletePack(id: string) {
    return instanceHeroku.delete(`/cards/pack?id=${id}`);
  },
  editPack(editCardPack: EditCardPackRequestType) {
    return instanceHeroku.put(`/cards/pack`, editCardPack);
  },
};
