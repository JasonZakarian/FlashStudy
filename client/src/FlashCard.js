import React from "react";
import "./FlashCard.css";
import { Input, Button, Row } from "reactstrap";

class FlashCard extends React.Component {
  state = {
    answer: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="flashCard">
        <div className="front">
          <p>
            ___ is a shorthand for JavaScript XML. This is a type of file used
            by React which utilizes the expressiveness of JavaScript along with
            HTML like template syntax. This makes the HTML file really easy to
            understand. This file makes applications robust and boosts its
            performance.
          </p>
          <Row>
            <Input
              type="text"
              name="answer"
              className="input"
              value={this.state.answer}
              onChange={this.onChange}
            />
          </Row>
          <Button type="button" className="btn btn-primary">
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default FlashCard;
