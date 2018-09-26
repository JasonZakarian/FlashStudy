import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainApp from "./MainApp";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(<MainApp />, document.getElementById("root"));
registerServiceWorker();
