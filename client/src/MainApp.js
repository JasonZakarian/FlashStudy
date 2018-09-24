import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../src/App";

const MainApp = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  );
};

export default MainApp;
