import { instanceHeroku } from "../../app/appAPI";
import { editCardType } from "./cardsReducer";

export const cardsAPI = {
  getCards(params: CardParamsType) {
    return instanceHeroku.get<CardResponseType>(`cards/card`, { params });
  },
  updateCard(grade: number, card_id: string) {
    return instanceHeroku.put<GradeResponseType>("cards/grade", { grade, card_id });
  },
  addCard(newCard: NewCardRequestType) {
    return instanceHeroku.post("cards/card", newCard);
  },
  deleteCard(id: string) {
    return instanceHeroku.delete(`cards/card?id=${id}`);
  },
  editCard(editCard: editCardType) {
    return instanceHeroku.put(`cards/card`, editCard);
  },
};

////////////////// types /////////////////
export type CardParamsType = {
  cardsPack_id?: string;
  cardAnswer?: string;
  cardQuestion?: string;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};

export type CardResponseType = {
  cards: CardsType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  packCreated: string;
  packName: string;
  packPrivate: boolean;
  packUpdated: string;
  packUserId: string;
  page: number;
  pageCount: number;
  token: string;
  tokenDeathTime: string;
};

export type CardsType = {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  question: string;
  answer: string;
  grade: number;
  shots: number;
  questionImg: string;
  answerImg: string;
  comments: string;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  _v: number;
  answerVideo: string;
  questionVideo: string;
};

export type GradeResponseType = {
  _id: string;
  cardsPack_id: string;
  card_id: string;
  user_id: string;
  grade: number;
  shots: number;
};

export type NewCardRequestType = {
  card: {
    cardsPack_id: string;
    question: string;
    answer: string;
    grade?: number;
    shots?: number;
    answerImg?: string;
    questionImg?: string;
    questionVideo?: string;
    answerVideo?: string;
  };
};
