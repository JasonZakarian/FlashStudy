import axios from "axios";

const baseUrl = "/api/cards";

export function CreateCard(payload) {
  return axios.post(`${baseUrl}`, payload);
}

export function GetCardByPosition(deckId, position) {
  return axios.get(`${baseUrl}/${deckId}/${position}`);
}

export function EditCard(payload) {
  return axios.put(`${baseUrl}`, payload);
}

export function GetFullDeck(deckId) {
  return axios.get(`${baseUrl}/${deckId}`);
}

export function DeleteCard(deck, position) {
  return axios.delete(`${baseUrl}/${deck}/${position}`);
}

export function SaveDeckPositions(fullDeck) {
  return axios.put(`${baseUrl}/fullUpdate`, fullDeck);
}

//BASE FLIP FUNCTION
/* flip = () => {
  if (this.state.flip === "") {
    this.setState({ flip: "flip" });
  } else {
    this.setState({ flip: "" });
  }
}; */
