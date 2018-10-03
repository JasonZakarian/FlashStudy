import React from "react";
import { Col } from "reactstrap";
import "./stylesheets/App.css";
import Login from "./Login";
import flash from "./assets/Flash Gordon - Queen.mp3";

class LandingPage extends React.Component {
  toCreate = () => {
    this.props.history.push("deckcreator");
  };

  toEdit = () => {
    this.props.history.push("deckeditor");
  };

  toStudy = () => {
    this.props.history.push("studydesk");
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
          <audio ref="audio_tag" src={flash} autoPlay />
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
            <a href="JavaScript:Void(0);" style={{ textDecoration: "none" }}>
              <div className="landingButton" onClick={this.toStudy}>
                <br />
                <br />
                <br />
                <span style={{ fontSize: "50px" }}>STUDY</span>
              </div>
            </a>
          </Col>
        </div>
      </div>
    );
  }
}

export default LandingPage;
