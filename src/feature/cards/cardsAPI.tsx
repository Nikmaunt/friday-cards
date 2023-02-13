import { instance } from "../../app/appAPI";

export const cardsAPI = {
   getCards (packID:any) {
        return instance.get<any>("/cards/card");
    },

};