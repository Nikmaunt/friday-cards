import {instance} from "../../app/appAPI";


export type CardsReturnType = {
   _id: string
    cardsPack_id:string
    user_id:string
    question:string
    answer:string
    grade:number
    shots:number
    questionImg:string
    answerImg:string
    comments:string
    type:string
    rating:number
    more_id:string
    created:string
    updated:string
    _v:number
    answerVideo:string
    questionVideo:string
};

export const cardsAPI = {
   getCards (packID:string) {
        return instance.get<any>(`cards/card?cardsPack_id=${packID}`);
    },

};