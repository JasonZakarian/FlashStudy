import React from "react";
import FlashCard from "./components/FlashCard";
import { connect } from "react-redux";
import {
  Label,
  Input,
  Container,
  Col,
  Row,
  UncontrolledTooltip
} from "reactstrap";
import { CreateDeck } from "./services/deck.service";
import {
  CreateCard,
  GetCardByPosition,
  EditCard
} from "./services/card.service";
import "./stylesheets/App.css";
import "./stylesheets/FlashCard.css";

class DeckCreator extends React.Component {
  state = {
    answer: "",
    question: "",
    deckName: "",
    readyForCards: false,
    currentPosition: 0,
    maximumPosition: 0,
    currentCardId: ""
  };

  componentDidMount() {
    if (this.props.currentPosition && this.props.currentDeck) {
      this.setState({
        currentPosition: this.props.currentPosition,
        maximumPosition: this.props.currentPosition,
        deckName: this.props.currentDeckName,
        readyForCards: true
      });
    }
  }

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
      this.setState({ readyForCards: true });
      this.setState({ currentPosition: 1, maximumPosition: 1 });
      this.props.setCurrentDeckName(this.state.deckName);
    });
  };

  sendCreateCardRequest = () => {
    if (this.state.currentPosition < this.state.maximumPosition) {
      let payload = {
        id: this.state.currentCardId,
        deckId: this.props.currentDeck,
        question: this.state.question,
        answer: this.state.answer,
        position: this.state.currentPosition
      };
      EditCard(payload).then(() => {
        if (this.state.currentPosition + 1 === this.state.maximumPosition) {
          this.setState({
            answer: "",
            question: "",
            currentCardId: "",
            currentPosition: this.state.currentPosition + 1
          });
        } else if (
          this.state.currentPosition + 1 <
          this.state.maximumPosition
        ) {
          GetCardByPosition(
            this.props.currentDeck,
            this.state.currentPosition + 1
          ).then(response => {
            this.setState({
              answer: response.data.item.answer,
              question: response.data.item.question,
              currentPosition: this.state.currentPosition + 1,
              currentCardId: response.data.item.id
            });
          });
        }
      });
    } else if (this.state.currentPosition === this.state.maximumPosition) {
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
          currentPosition: this.state.currentPosition + 1,
          maximumPosition: this.state.maximumPosition + 1
        });
      });
    }
  };

  getLastCard = () => {
    GetCardByPosition(
      this.props.currentDeck,
      this.state.currentPosition - 1
    ).then(response => {
      this.setState({
        answer: response.data.item.answer,
        question: response.data.item.question,
        currentPosition: this.state.currentPosition - 1,
        currentCardId: response.data.item.id
      });
    });
  };

  sendToEdit = () => {
    this.props.history.push("deckeditor");
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
            className="doubleArrowWrapper"
            id="doubleWrapper"
            onClick={this.sendToEdit}
            style={{
              display:
                this.state.answer === "" &&
                this.state.question === "" &&
                this.state.currentPosition > 1
                  ? "inline"
                  : "none"
            }}
          >
            <UncontrolledTooltip placement="right" target="doubleWrapper">
              If there's no more cards to add click here to finish up.
              Otherwise, keep typing below!
            </UncontrolledTooltip>
            <div
              className="doubleArrow-right"
              style={{ display: "inline-block" }}
            />
            <div
              className="doubleArrow-right"
              style={{ display: "inline-block" }}
            />
          </div>

          <div
            className="arrow-right"
            onClick={this.sendCreateCardRequest}
            style={{
              display:
                this.state.answer !== "" && this.state.question !== ""
                  ? "inline"
                  : "none"
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
      dispatch({ type: "SET_CURRENTDECK", currentDeck }),
    setCurrentDeckName: currentDeckName =>
      dispatch({ type: "SET_CURRENTDECKNAME", currentDeckName })
  };
}

function mapStateToProps(state) {
  return {
    decks: state.decks,
    userId: state.userId,
    currentDeck: state.currentDeck,
    currentPosition: state.currentPosition,
    currentDeckName: state.currentDeckName
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckCreator);
