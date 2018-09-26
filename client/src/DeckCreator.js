import React from "react";
import FlashCard from "./FlashCard";

class DeckCreator extends React.Component {
  state = {
    answer: "JSX"
  };
  render() {
    return (
      <div>
        <FlashCard answer="JSX" />
      </div>
    );
  }
}

export default DeckCreator;
