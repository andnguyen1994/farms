import React from "react";
import ReactDOM from "react-dom";
import store from "./configureStore";
import { Provider } from "react-redux";
import "./index.css";
import "antd/dist/antd.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Main from "./components/Main";

/* add router 
-organization
-understanding API middleware
-understanding redux
-understanding firebase architecture
-router
-understand async await*/

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
