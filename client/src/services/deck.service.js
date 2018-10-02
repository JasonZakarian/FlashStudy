import axios from "axios";

const baseUrl = "/api/decks";

export function GetAllDecks() {
  return axios.get(`${baseUrl}`);
}

export function CreateDeck(payload) {
  return axios.post(`${baseUrl}`, payload);
}

export function DeckDestroy(deckId) {
  return axios.delete(`${baseUrl}/${deckId}`);
}
