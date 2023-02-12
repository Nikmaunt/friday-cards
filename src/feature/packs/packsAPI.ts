import axios from "axios/index";
import { instance } from "../../app/appAPI";

type ValuesType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string; // формат 0updated (0 или 1) и название критерия сортировки
  page?: number;
  pageCount?: number;
  user_id?: string;
  block?: boolean;
};

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
  getPacks(user_id?: string) {
    const values: ValuesType = {
      user_id,
    };
    return instance.get<PacksReturnType>("/cards/pack");
  },
};
