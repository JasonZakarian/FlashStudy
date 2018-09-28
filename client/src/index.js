import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/index.css";
import MainApp from "./MainApp";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(<MainApp />, document.getElementById("root"));
registerServiceWorker();
