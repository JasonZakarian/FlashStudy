import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  GetFullDeck,
  GetCardByPosition,
  DeleteCard,
  EditCard,
  SaveDeckPositions
} from "./services/card.service";
import { connect } from "react-redux";
import { Input, Col, Label, Container, Row } from "reactstrap";
import "./stylesheets/FlashCard.css";
import "./stylesheets/App.css";
import FlashCard from "./components/FlashCard";
import swal from "sweetalert2";
import { Redirect } from "react-router-dom";

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 500,
  marginTop: "2em",
  borderRadius: "20px",
  marginLeft: "20em"
});

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  color: "#EDDDD4",
  borderRadius: "20px",

  // change background colour if dragging
  background: isDragging ? "#283D3B" : "#197278",

  // styles we need to apply on draggables
  ...draggableStyle
});

class DeckFinalCheck extends React.Component {
  state = {
    deckSelect: "---",
    fullDeck: "",
    answer: "",
    question: "",
    position: "",
    id: ""
  };

  componentDidMount() {
    if (this.props.currentDeck) {
      GetFullDeck(this.props.currentDeck).then(response => {
        this.setState({ fullDeck: response.data.item });
        this.setState({ deckSelect: this.props.currentDeck });
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  selectDeck = () => {
    GetFullDeck(this.state.deckSelect).then(response => {
      this.setState({ fullDeck: response.data.item });
      this.props.setCurrentDeck(Number(this.state.deckSelect));
      this.props.setCurrentDeckName(response.data.item[0].deckName);
    });
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const fullDeck = this.reorder(
      this.state.fullDeck,
      result.source.index,
      result.destination.index
    );
    this.setState({ fullDeck });
  };

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  editCard = e => {
    GetCardByPosition(this.state.deckSelect, e.target.name).then(response => {
      this.setState({ question: response.data.item.question });
      this.setState({ answer: response.data.item.answer });
      this.setState({ position: response.data.item.position });
      this.setState({ id: response.data.item.id });
      console.log(response.data.item);
    });
  };

  deleteCard = e => {
    let position = Number(e.target.value);
    swal({
      title: "Confirm Delete",
      text: "We can't get the card back once it's gone!",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete"
    }).then(result => {
      if (result.value) {
        DeleteCard(this.state.deckSelect, position).then(() => {
          GetFullDeck(this.state.deckSelect).then(response => {
            this.setState({ fullDeck: response.data.item });
          });
        });
      }
    });
  };

  cancelEdit = () => {
    this.setState({
      answer: "",
      question: "",
      position: ""
    });
  };

  sendEditCardRequest = () => {
    let payload = {
      id: this.state.id,
      deckId: this.state.deckSelect,
      answer: this.state.answer,
      question: this.state.question,
      position: this.state.position
    };
    EditCard(payload).then(response => {
      console.log(response);
      this.selectDeck();
      this.setState({
        answer: "",
        question: "",
        position: "",
        id: ""
      });
    });
  };

  saveDeckPositions = () => {
    SaveDeckPositions(this.state.fullDeck).then(() => {
      swal({
        type: "success",
        title: "Deck Saved!"
      });
    });
  };

  saveDeckAndExit = () => {
    this.saveDeckPositions();
    this.props.history.push("/");
    this.props.setCurrentDeck(null);
    this.props.setCurrentPosition(null);
    this.props.setCurrentDeckName(null);
  };

  addCard = () => {
    this.props.setCurrentPosition(this.state.fullDeck.length + 1);
    this.props.history.push("deckcreator");
  };

  render() {
    if (this.props.currentDeck === null && this.state.fullDeck === "") {
      return (
        <div>
          <header className="Creator-header" />
          <Container>
            <Col md={{ size: "6", offset: 2 }}>
              <Label style={{ marginTop: "8em" }}>
                Ok, which deck needs work?
              </Label>
              <Input type="select" onChange={this.onChange} name="deckSelect">
                <option>---</option>
                {this.props.allDecks.map(deck => {
                  return (
                    <option value={deck.id} key={deck.id}>
                      {deck.name}
                    </option>
                  );
                })}
              </Input>
              <button
                type="button"
                className="submitButton btn"
                onClick={this.selectDeck}
                style={{
                  marginLeft: "14em",
                  marginTop: "1em",
                  visibility:
                    this.state.deckSelect !== "---" ? "visible" : "hidden"
                }}
              >
                Submit
              </button>
            </Col>
          </Container>
        </div>
      );
    } else if (this.state.fullDeck != "") {
      //We need to account for decks with 0 cards.  Breaks at the moment.
      return (
        <div>
          <header className="Creator-header" />
          <Row>
            <div style={{ marginLeft: "21em" }}>
              <button
                type="button"
                className="btn btn-lg editorButton btn-secondary"
                onClick={this.addCard}
              >
                Add Card
              </button>
              <button
                type="button"
                className="btn btn-lg editorButton btn-secondary"
                onClick={this.saveDeckPositions}
              >
                Save List
              </button>
              <button
                type="button"
                className="btn btn-lg editorButton btn-secondary"
                onClick={this.saveDeckAndExit}
              >
                Save and Exit
              </button>
            </div>
          </Row>
          <Row>
            <Col md="auto">
              <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {this.state.fullDeck.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              {item.question}
                              <br />
                              <br />
                              <button
                                type="button"
                                className="btn btn-sm submitButton"
                                onClick={this.editCard}
                                name={item.position}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm deleteButton"
                                onClick={this.deleteCard}
                                value={item.position}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Col>
            <Col
              md="auto"
              style={{
                display: this.state.question === "" ? "none" : "inline"
              }}
            >
              <div
                style={{ position: "sticky", top: "225px", marginTop: "1em" }}
              >
                <FlashCard
                  frontButtonLabel="Check Answer"
                  question={this.state.question}
                  answer={this.state.answer}
                />
                <br />
                <div>
                  <Col md={{ size: "10", offset: 1 }}>
                    <Label>Question:</Label>
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
                    <br />
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      style={{ marginRight: "2em" }}
                      onClick={this.sendEditCardRequest}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={this.cancelEdit}
                    >
                      Cancel
                    </button>
                  </Col>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      );
    } else {
      return null;
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentDeck: currentDeck =>
      dispatch({ type: "SET_CURRENTDECK", currentDeck }),
    setCurrentPosition: currentPosition =>
      dispatch({ type: "SET_CURRENTPOSITION", currentPosition }),
    setCurrentDeckName: currentDeckName =>
      dispatch({ type: "SET_CURRENTDECKNAME", currentDeckName })
  };
}

function mapStateToProps(state) {
  return {
    currentDeck: state.currentDeck,
    allDecks: state.decks
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckFinalCheck);
