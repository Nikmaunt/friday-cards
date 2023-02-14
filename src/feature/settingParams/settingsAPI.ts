import { instanceHeroku } from "../../app/appAPI";

export const settingsAPI = {
  getPacks(params: ParamsRequestType) {
    return instanceHeroku.get<PackResponseType>("/cards/pack", { params });
  },
  postPack() {
    return instanceHeroku.post("/cards/pack");
  },
};

///////////// types //////////////
export type PackResponseType = {
  cardPacks: CardPacksType[];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
  token: number;
  tokenDeathTime: number;
};
type CardPacksType = {
  _id: string;
  user_id: string;
  name: string;
  cardsCount: number;
  created: string;
  updated: string;
};

export type ParamsRequestType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: number;
  block?: boolean;
};
