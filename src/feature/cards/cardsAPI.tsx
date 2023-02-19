import { instanceHeroku } from "../../app/appAPI";

// export const cardsAPI = {
//   getCards(packID: string) {
//     return instanceHeroku.get<CardResponseType>(`cards/card?cardsPack_id=${packID}`);
//   },
//   addCard(newCard: NewCardRequestType) {
//     return instanceHeroku.post("cards/card", newCard);
//   },
// };

export const cardsAPI = {
  getCards(packID: string,params:any) {
    return instanceHeroku.get<CardResponseType>(`cards/card?cardsPack_id=${packID}`,{params});
  },
  setCards(packID: string,params:any) {
    return instanceHeroku.get<CardResponseType>(`cards/card?cardsPack_id=${packID}`,{params});
  },
  addCard(newCard: NewCardRequestType) {
    return instanceHeroku.post('cards/card',newCard);
  },
};


////////////////// types /////////////////
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
