import React from "react";
import HomePage from "./pages/homePage";
import Login from "./pages/auth/loginPage";
import Register from "./pages/auth/registerPage";
import VerifPage from "./pages/auth/verifPage";
import RegisterSuccessPage from "./pages/auth/registerSuccessPage";
import ChangePassPage from "./pages/changePass";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { keepLogin } from "./redux/actions";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    let userid = localStorage.getItem("token");
    this.props.keepLogin(userid);
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
              path="/auth/register_success/:verifEmail"
              component={RegisterSuccessPage}
            ></Route>
            <Route
              path="/auth/verification/:email"
              component={VerifPage}
            ></Route>
            <Route path= "/change-password/:id" component={ ChangePassPage }></Route>
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

export default connect(mapStateToProps, { keepLogin })(App);
