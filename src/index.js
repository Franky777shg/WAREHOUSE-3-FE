import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import allReducer from './redux/reducers'
import ReduxThunk from 'redux-thunk'
import "bootstrap/dist/css/bootstrap.min.css";

const globalState = createStore(allReducer, applyMiddleware(ReduxThunk))

ReactDOM.render(
  <Provider store={globalState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
