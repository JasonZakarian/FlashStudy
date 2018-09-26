import React, { Component } from "react";
import "./App.css";
import Login from "./Login";
import { Switch, Route } from "react-router-dom";
import FlashCard from "./FlashCard";
import DeckCreator from "./DeckCreator";

class App extends Component {
  render() {
    return (
      <div>
        <header className="App-header" />
        <div>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/deckcreator" component={DeckCreator} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
