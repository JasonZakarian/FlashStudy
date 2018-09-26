import React, { Component } from "react";
import "./App.css";
import login from "./Login";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <header className="App-header" />
        <div>
          <Switch>
            <Route exact path="/login" component={login} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
