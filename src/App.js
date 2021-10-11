import React from "react";
import HomePage from "./pages/homePage";
import Login from "./pages/auth/loginPage";
import Register from "./pages/auth/registerPage";
import VerifPage from "./pages/auth/verifPage";
import ForgotPassPage from "./pages/auth/forgotPassPage";
import ResetPassPage from "./pages/auth/resetPassPage";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { keepLogin, logout } from "./redux/actions";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    this.props.keepLogin();
  }
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/auth/login">
              <Login />
            </Route>
            <Route path="/auth/register">
              <Register />
            </Route>
            <Route
              path="/auth/verification/:email"
              component={VerifPage}
            ></Route>
            <Route path="/auth/forgot" component={ForgotPassPage}></Route>
            <Route
              path="/auth/reset/:emailToken"
              component={ResetPassPage}
            ></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.userReducer.username,
  };
};

export default connect(mapStateToProps, { keepLogin, logout })(App);
