import React from "react";
import { Col } from "reactstrap";
import "./stylesheets/App.css";
import Login from "./Login";

class LandingPage extends React.Component {
  toCreate = () => {
    this.props.history.push("deckcreator");
  };

  toEdit = () => {
    this.props.history.push("deckeditor");
  };

  render() {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            backgroundColor: "#197278",
            color: "#EDDDD4",
            height: "63em",
            width: "63em"
          }}
        >
          <p
            style={{
              fontSize: "300px",
              fontFamily: "helvetica"
            }}
          >
            FLASH
          </p>
          <p style={{ fontSize: "290px", fontFamily: "helvetica" }}>STUDY</p>
        </div>

        <div>
          <Col md={{ size: "6", offset: 7 }} style={{ marginTop: "5em" }}>
            <a href="JavaScript:Void(0);" style={{ textDecoration: "none" }}>
              <div className="landingButton" onClick={this.toCreate}>
                <br />
                <br />
                <br />
                <span style={{ fontSize: "50px" }}>CREATE</span>
              </div>
            </a>
            <a href="JavaScript:Void(0);" style={{ textDecoration: "none" }}>
              <div className="landingButton" onClick={this.toEdit}>
                <br />
                <br />
                <br />
                <span style={{ fontSize: "50px" }}>EDIT</span>
              </div>
            </a>
            <div className="landingButton">
              <br />
              <br />
              <br />
              <span style={{ fontSize: "50px" }}>STUDY</span>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}

export default LandingPage;
