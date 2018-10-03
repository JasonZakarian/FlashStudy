import React, { Component } from "react";
import "./stylesheets/App.css";
import Login from "./Login";
import { Switch, Route } from "react-router-dom";
import DeckCreator from "./DeckCreator";
import { GetAllDecks } from "./services/deck.service";
import { connect } from "react-redux";
import DeckFinalCheck from "./DeckFinalCheck";
import LandingPage from "./LandingPage";
import StudyDesk from "./StudyDesk";

class App extends Component {
  state = {
    userId: "",
    decks: ""
  };

  componentDidMount() {
    GetAllDecks().then(response => {
      this.setState({ decks: response.data.item });
      this.props.setDecks(this.state.decks);
      this.props.setUserId(1); //This needs to be swtiched out for a check user call in the server.
    });
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/studydesk" component={StudyDesk} />
          <Route
            exact
            path="/deckcreator"
            render={props => <DeckCreator {...props} />}
          />
          <Route exact path="/deckeditor" component={DeckFinalCheck} />
        </Switch>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserId: userId => dispatch({ type: "SET_USERID", userId }),
    setDecks: decks => dispatch({ type: "SET_DECKS", decks })
  };
}

function mapStateToProps(state) {
  return {
    decks: state.decks,
    userId: state.userId
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
