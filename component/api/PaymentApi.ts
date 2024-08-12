import { AxiosResponse } from "axios";
import { apiCardList, apiPayment } from "../../config/network";

export const parsePayToken = async (payToken:string):Promise<AxiosResponse<any>> => {
    return await apiPayment(`/api/v1/payment-histories/pay-token`, "get", {}, {'Authorization': payToken});
}

export const getLastCard = async (userToken:string):Promise<AxiosResponse<any>> => {
    return await apiPayment(`/api/v1/payment-histories/last-card`, "get", {}, {'Authorization': userToken});
}

export const updatePayment = async (userToken:string, ):Promise<AxiosResponse<any>> => {
    return await apiPayment(``, "put", {}, {'Authorization': `Bearer ${userToken}`})
}

export const getMyCard = async (cardId: number):Promise<AxiosResponse<any>> => {
    const query = `
        query {
            getMyCard(cardId: ${cardId}) {
                cardName
                cardNumber
                account
                cardProduct{
                  cardImg
                }
            }
        }
    `;

    const body = { query };
    return await apiCardList(`/graphql`, "post", body);
}