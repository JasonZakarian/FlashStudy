import axios from "axios";

const baseUrl = "/api/cards";

export function CreateCard(payload) {
  return axios.post(`${baseUrl}`, payload);
}

export function GetCardByPosition(deck, position) {
  return axios.get(`${baseUrl}/${deck}/${position}`);
}
