import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// state management
import { createStore, applyMiddleware } from "redux";
import allReducer from "../src/redux/reducers";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";

const globalState = createStore(allReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={globalState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
