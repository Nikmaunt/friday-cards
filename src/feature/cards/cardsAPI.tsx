import { instanceHeroku } from "../../app/appAPI";
import {CardParamsType, CardsType, editCardType} from "./cardsReducer";

export const cardsAPI = {
  getCards(packID: string, params?:CardParamsType) {
    return instanceHeroku.get<CardRequestType>(`cards/card?cardsPack_id=${packID}`, {params});
  },
  udpateCard(grade: number, card_id:string) {
    return instanceHeroku.put<GradeResponseType>('cards/grade',{grade,card_id});
  },
  addCard(newCard: NewCardRequestType) {
    return instanceHeroku.post("cards/card", newCard);
  },
  deleteCard(id:string) {
    return instanceHeroku.delete(`cards/card?id=${id}`);
  },
  editCard(editCard: editCardType) {
    return instanceHeroku.put(`cards/card`, editCard);
  },
};


////////////////// types /////////////////

export type CardRequestType = {
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


export type GradeResponseType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}

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
