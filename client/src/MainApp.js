import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../src/App";
import { Provider } from "react-redux";
import store from "./store";

const MainApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default MainApp;
