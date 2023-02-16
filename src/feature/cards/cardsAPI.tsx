import { instance, instanceHeroku } from "../../app/appAPI";

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
  cards:CardsType[];
  cardsTotalCount: number;
  maxGrade:number;
  minGrade:number;
  packCreated:string;
  packName:string;
  packPrivate:boolean;
  packUpdated:string;
  packUserId:string;
  page:number;
  pageCount:number;
  token:string;
  tokenDeathTime:string;
}


export const cardsAPI = {
  getCards(packID:string) {
    return instanceHeroku.get<CardResponseType>(`cards/card?cardsPack_id=${packID}`);
  },
};

// addCard (cardsPack_id:string){
//  return instance.get<any>(`cards/card?cardsPack_id=${cardsPack_id}`);
// }
