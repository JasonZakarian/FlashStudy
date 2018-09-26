import React from "react";
import "./FlashCard.css";
import { Input, Row, Container } from "reactstrap";

class FlashCard extends React.Component {
  state = {
    input: "",
    flipClass: "flip-container",
    flip: "",
    answer: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  flip = () => {
    if (this.state.flip === "") {
      this.setState({ flip: "flip" });
    } else {
      this.setState({ flip: "" });
    }
  };

  render() {
    return (
      <Container>
        <div className={`${this.state.flipClass} ${this.state.flip}`}>
          <div className="flipper flashCard">
            <div className="front">
              <p>Question:</p>
              <p>
                ___ is a shorthand for JavaScript XML. This is a type of file
                used by React which utilizes the expressiveness of JavaScript
                along with HTML like template syntax. This makes the HTML file
                really easy to understand. This file makes applications robust
                and boosts its performance.
              </p>
              <Row>
                <Input
                  type="text"
                  name="input"
                  className="input"
                  value={this.state.input}
                  onChange={this.onChange}
                />
              </Row>
              <button
                type="button"
                className="submitButton btn"
                onClick={this.flip}
              >
                Submit
              </button>
            </div>{" "}
            {/*Front End*/}
            <div className="back">
              <h2>
                {this.state.input === this.props.answer
                  ? "That's right!"
                  : "Incorrect"}
              </h2>
              <br />
              <p>Correct Answer: {this.props.answer}</p>
              <p>Your answer: {this.state.input}</p>
              <button
                type="button"
                className="submitButton btn"
                onClick={this.flip}
              >
                Back to Question
              </button>
            </div>{" "}
            {/*Back End*/}
          </div>
        </div>
      </Container>
    );
  }
}

export default FlashCard;
