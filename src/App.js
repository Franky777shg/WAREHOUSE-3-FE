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
import DetailPage from "./pages/productDetail";

import cartPage from "./pages/transaction/cartPage";
import CheckoutPage from "./pages/transaction/checkoutPage";
import PaymentPage from "./pages/transaction/paymentPage";

// ADMIN
import adminHomePage from "./pages/__admin/homePage";
import adminLoginPage from "./pages/__admin/loginPage";
import superAdminPage from "./pages/__admin/superAdminPage";
import ProductAdmin from "./pages/__admin/productAdmin";
import ProdAdminEditPage from "./pages/__admin/productEditAdmin";
import AddProductAdmin from "./pages/__admin/addProdAdmin";
import listTransactionPage from "./pages/__admin/listTransactionPage";
import adminWarehousepage from "./pages/__admin/adminWarehousePage";

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
            <Route path="/change-password" component={ChangePassPage}></Route>
            <Route path="/product" component={ProductPage} />
            <Route path="/detail-product/:id" component={DetailPage} />

            <Route path="/profile" component={ProfilePage} />

            <Route path="/admin/home" component={adminHomePage} />
            <Route path="/auth/admin/login" component={adminLoginPage} />

            <Route path="/cart" component={cartPage} />
            <Route path="/payment/:payToken" component={PaymentPage} />

            <Route path="/admin/superadmin-page" component={superAdminPage} />
            <Route path="/admin/adminwarehouse-page" component={adminWarehousepage} />

            <Route
              path="/admin/transactionlist-page"
              component={listTransactionPage}
            />

            <Route path="/auth/admin/login" component={adminLoginPage} />
            <Route path="/admin/product-admin" component={ProductAdmin} />
            <Route
              path="/admin/product-admin-edit/:id"
              component={ProdAdminEditPage}
            />
            <Route path="/admin/add-product" component={AddProductAdmin} />
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
