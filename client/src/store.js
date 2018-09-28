import { createStore } from "redux";

function reducer(state, action) {
  if (!state) {
    return {
      userId: null,
      decks: [],
      currentDeck: null
    };
  }

  if (action.type === "SET_CURRENTDECK") {
    return {
      ...state,
      currentDeck: action.currentDeck
    };
  }

  if (action.type === "SET_USERID") {
    return {
      ...state,
      userId: action.userId
    };
  }

  if (action.type === "SET_DECKS") {
    return {
      ...state,
      decks: action.decks
    };
  }
}

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
