import React from "react";
import FlashCard from "./components/FlashCard";
import "./stylesheets/App.css";
import { Col, Label, Input, Container } from "reactstrap";
import { connect } from "react-redux";
import { GetFullDeck } from "./services/card.service";

class StudyDesk extends React.Component {
  state = {
    fullDeck: "",
    deckSelect: "",
    currentQuestion: 0,
    currentDeckName: "",
    maxLength: "",
    flip: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  selectDeck = () => {
    GetFullDeck(this.state.deckSelect).then(response => {
      this.setState({
        fullDeck: response.data.item,
        maxLength: response.data.item.length,
        currentDeckName: response.data.item[0].deckName
      });
      this.props.setCurrentDeck(Number(this.state.deckSelect));
      this.props.setCurrentDeckName(response.data.item[0].deckName);
    });
  };

  flip = () => {
    if (this.state.flip === "") {
      this.setState({ flip: "flip" }, () => {
        setTimeout(() => {
          if (this.state.currentQuestion + 1 === this.state.maxLength) {
            this.props.history.push("/");
          } else {
            this.setState(
              {
                flip: ""
              },
              () => {
                setTimeout(() => {
                  this.setState({
                    currentQuestion: this.state.currentQuestion + 1
                  });
                }, 250);
              }
            );
          }
        }, 3000);
      });
    }
  };

  flipCard = () => {
    this.flip();
  };

  render() {
    if (this.state.fullDeck === "") {
      return (
        <div>
          <header className="Creator-header" />
          <Container>
            <Col md={{ size: "6", offset: 2 }}>
              <Label style={{ marginTop: "8em" }}>
                What do you want to study?
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
    } else
      return (
        <div>
          <header className="Creator-header" />
          <h1 style={{ textAlign: "center", marginRight: "3em" }}>
            {this.state.currentDeckName}, Question:{" "}
            {this.state.currentQuestion + 1}
          </h1>
          <Col md={{ size: "8", offset: 3 }} style={{ marginTop: "2em" }}>
            <FlashCard
              question={
                this.state.fullDeck[this.state.currentQuestion].question
              }
              answer={this.state.fullDeck[this.state.currentQuestion].answer}
              frontButtonLabel="Submit Answer"
              onFlip={this.flip}
              flip={this.state.flip}
            />
          </Col>
        </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    allDecks: state.decks,
    currentDeckName: state.currentDeckName
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentDeck: deck => dispatch({ type: "SET_CURRENTDECK", deck }),
    setCurrentDeckName: name => dispatch({ type: "SET_CURRENTDECKNAME", name })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudyDesk);
