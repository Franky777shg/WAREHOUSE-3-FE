import React from "react";
import HomePage from "./pages/homePage";
import Login from "./pages/auth/loginPage";
import Register from "./pages/auth/registerPage";
import VerifPage from "./pages/auth/verifPage";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
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
          <Route path="/auth/verification">
            <VerifPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
