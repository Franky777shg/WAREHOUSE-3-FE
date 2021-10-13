import React from "react";
import HomePage from "./pages/homePage";
import Login from "./pages/auth/loginPage";
import Register from "./pages/auth/registerPage";
import VerifPage from "./pages/auth/verifPage";
import ForgotPassPage from "./pages/auth/forgotPassPage";
import ResetPassPage from "./pages/auth/resetPassPage";
import ChangePassPage from "./pages/changePass";
import ProductPage from "./pages/products";
import ProfilePage from "./pages/ProfilePage";

// ADMIN
import adminHomePage from "./pages/__admin/homePage";
import adminLoginPage from "./pages/__admin/loginPage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { keepLogin, logout, keepAdminLogin } from "./redux/actions";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    this.props.keepLogin();
    this.props.keepAdminLogin();
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
            <Route
              path="/change-password/:id"
              component={ChangePassPage}
            ></Route>
            <Route path="/product" component={ProductPage} />
            <Route path="/profile" component={ProfilePage} />

            {/* ADMIN ROUTING */}
            <Route path="/admin" component={adminHomePage} />
            <Route path="/auth/admin/login" component={adminLoginPage} />
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

export default connect(mapStateToProps, { keepLogin, logout, keepAdminLogin })(
  App
);
