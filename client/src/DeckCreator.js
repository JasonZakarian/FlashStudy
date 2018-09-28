import React from "react";
import FlashCard from "./components/FlashCard";
import { connect } from "react-redux";
import { Label, Input, Container, Col, Row } from "reactstrap";
import { CreateDeck } from "./services/deck.service";
import { CreateCard, GetCardByPosition } from "./services/card.service";
import "./stylesheets/App.css";
import "./stylesheets/FlashCard.css";

class DeckCreator extends React.Component {
  state = {
    answer: "",
    question: "",
    deckName: "",
    readyForCards: false,
    currentPosition: 0,
    editMode: false
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setReady = () => {
    let payload = {
      userId: this.props.userId,
      name: this.state.deckName
    };
    CreateDeck(payload).then(response => {
      this.props.setCurrentDeck(response.data.item);
    });
    this.setState({ readyForCards: true });
    this.setState({ currentPosition: 1 });
  };

  sendCreateCardRequest = () => {
    let payload = {
      deckId: this.props.currentDeck,
      question: this.state.question,
      answer: this.state.answer,
      position: this.state.currentPosition
    };
    CreateCard(payload).then(() => {
      this.setState({
        answer: "",
        question: "",
        currentPosition: this.state.currentPosition + 1
      });
    });
  };

  getLastCard = () => {
    GetCardByPosition(
      this.props.currentDeck,
      this.state.currentPosition - 1
    ).then(response => {
      this.setState({
        answer: response.data.item.answer,
        question: response.data.item.question,
        editMode: true,
        currentPosition: this.state.currentPosition - 1
      });
    });
  };

  render() {
    if (this.state.readyForCards === false) {
      return (
        <div>
          <header className="Creator-header" />
          <Container>
            <Col md={{ size: "6", offset: 2 }}>
              <Label style={{ marginTop: "8em" }}>
                Great, so what's this deck about?
              </Label>
              <Row>
                <Input
                  name="deckName"
                  value={this.state.deckName}
                  onChange={this.onChange}
                />
                <button
                  type="button"
                  className="submitButton btn"
                  onClick={this.setReady}
                  style={{
                    marginLeft: "15em",
                    marginTop: "1em",
                    visibility:
                      this.state.deckName.length > 1 ? "visible" : "hidden"
                  }}
                >
                  Submit
                </button>
              </Row>
            </Col>
          </Container>
        </div>
      );
    }
    return (
      <div>
        <header className="Creator-header" />
        <h1 style={{ textAlign: "center", marginRight: "4em" }}>
          {this.state.deckName}, Question: {this.state.currentPosition}
        </h1>

        <Row>
          <div
            className="arrow-left"
            onClick={this.getLastCard}
            style={{
              marginLeft: "26em",
              visibility: this.state.currentPosition > 1 ? "visible" : "hidden"
            }}
          />
          <div>
            <FlashCard
              answer={this.state.answer}
              frontButtonLabel="Check Answer"
              question={this.state.question}
              createMode={true}
            />
          </div>
          <div
            className="arrow-right"
            onClick={this.sendCreateCardRequest}
            style={{
              visibility:
                this.state.answer != "" && this.state.question != ""
                  ? "visible"
                  : "hidden"
            }}
          />
        </Row>

        <br />
        <br />
        <div>
          <Col md={{ size: "5", offset: 3 }}>
            <Label>Enter a new question:</Label>
            <Input
              name="question"
              type="textarea"
              value={this.state.question}
              onChange={this.onChange}
              style={{ maxHeight: "4em" }}
            />
            <br />
            <Label>Answer:</Label>
            <Input
              name="answer"
              type="text"
              value={this.state.answer}
              onChange={this.onChange}
            />
          </Col>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentDeck: currentDeck =>
      dispatch({ type: "SET_CURRENTDECK", currentDeck })
  };
}

function mapStateToProps(state) {
  return {
    decks: state.decks,
    userId: state.userId,
    currentDeck: state.currentDeck
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckCreator);
