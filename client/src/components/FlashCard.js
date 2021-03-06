import React from "react";
import "../stylesheets/FlashCard.css";
import { Input, Row, Col } from "reactstrap";

class FlashCard extends React.Component {
  state = {
    input: "",
    flipClass: "flip-container",
    flip: "",
    answer: this.props.answer,
    question: this.props.question
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  flip = () => {
    this.props.onFlip();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // do things with nextProps.someProp and prevState.cachedSomeProp
    return {
      question: nextProps.question,
      answer: nextProps.answer,
      flip: nextProps.flip
    };
  }

  render() {
    return (
      <Col md="6">
        <div className={`${this.state.flipClass} ${this.props.flip}`}>
          <div className="flipper flashCard">
            <div className="front">
              <p>Question:</p>
              <p>{this.state.question}</p>
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
                {this.props.frontButtonLabel}
              </button>
            </div>{" "}
            {/*Front End*/}
            <div className="back">
              <h2>
                {this.state.input
                  .toLowerCase()
                  .includes(this.state.answer.toLowerCase())
                  ? "That's right!"
                  : "Incorrect"}
              </h2>
              <br />
              <p>Correct Answer: {this.state.answer}</p>
              <p>
                Your answer:
                {this.state.input}{" "}
              </p>
              <button
                type="button"
                className="submitButton btn"
                onClick={this.props.onFlip}
              >
                Back to Question
              </button>
            </div>{" "}
            {/*Back End*/}
          </div>
        </div>
      </Col>
    );
  }
}

export default FlashCard;
