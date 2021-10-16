import React from "react";
import {
  Navbar,
  Button,
  Container,
  Nav,
  Dropdown,
  Form,
  Badge,
  Image,
  DropdownButton,
} from "react-bootstrap";

import logo from "../assets/img/logo.svg";
import avatar from "../assets/img/avatar/avatar2.png";

import utils from "./../assets/styles/utils.module.css";

import { connect } from "react-redux";
import { logout } from "../redux/actions";
import { Link } from "react-router-dom";

import CartList from "./transaction/CartList";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogedIn: true,
      categoryVisibility: false,
    };
  }
  render() {
    return (
      <div>
        <Navbar
          style={style.navbar}
          className="p-1"
          variant="light"
          fixed="top"
        >
          <Container>
            <Navbar.Brand href="/">
              <img src={logo} style={style.navbarLogo} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-4" style={{ width: "80%" }}>
                <Nav.Link href="#" style={style.navbarLink}>
                  Home
                </Nav.Link>
                <Nav.Link
                  href="/product"
                  style={style.navbarLink}
                  className="ml-5"
                >
                  Products
                </Nav.Link>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="Searching for..."
                  className={`mx-2 ${utils.myInput}`}
                  style={style.searchForm}
                />

                <span style={style.searchIcon}>
                  <i class="fas fa-search" style={{ color: "#9CA3AF" }}></i>
                </span>
              </Nav>
              <Form inline className="d-flex">
                {this.props.username ? (
                  <>
                    <Dropdown className="cart-dropdown">
                      <Dropdown.Toggle
                        variant="default"
                        className={`m-1 mx-2 ${utils.myButton}`}
                      >
                        <i
                          className="fas fa-shopping-cart"
                          style={style.navIcon}
                        ></i>
                        <Badge bg="danger" style={style.badgeCart}>
                          0
                        </Badge>
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        className="mt-2 px-2"
                        style={style.dropdownMenu}
                      >
                        <CartList />
                      </Dropdown.Menu>
                    </Dropdown>

                    <Button
                      variant="default"
                      className={`m-1 mx-1 ${utils.myButton}`}
                      style={style.actionBtn}
                    >
                      <i className="fas fa-bell" style={style.navIcon}></i>
                    </Button>

                    {/* user menu */}
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="default"
                        className={utils.myButton}
                        style={style.navUserButton}
                        id="dropdown-basic"
                        align="end"
                      >
                        <Image src={avatar} width="35"></Image>
                        <span style={style.navUserName}>
                          {this.props.username}
                        </span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        className="mt-2"
                        style={style.dropdownMenu}
                      >
                        <Dropdown.Item
                          style={style.dropdownItem}
                          as={Link}
                          to={"/profile"}
                        >
                          <i className="fas fa-user mr-2"></i> profile
                        </Dropdown.Item>
                        <Dropdown.Item
                          style={style.dropdownItem}
                          as={Link}
                          to={"/change-password"}
                        >
                          <i className="fas fa-user-lock"></i> change password
                        </Dropdown.Item>
                        <Dropdown.Item style={style.dropdownItem} href="#">
                          <i className="fas fa-heart mr-2"></i> wishlists
                        </Dropdown.Item>
                        <Dropdown.Item style={style.dropdownItem} href="#">
                          <i className="fas fa-history mr-2"></i> history
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item style={style.dropdownItem}>
                          <div className="d-grid gap-2">
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={this.props.logout}
                              block
                            >
                              Logout
                            </Button>
                          </div>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                ) : (
                  <div style={style.navAuthButton} className="nav-auth-button">
                    <Button
                      as={Link}
                      to={"/auth/login"}
                      variant="primary"
                      className="mx-2"
                      style={style.navLoginButton}
                    >
                      login
                    </Button>

                    <Button
                      as={Link}
                      to={"/auth/register"}
                      variant="primary"
                      className="mr-1"
                      style={style.navRegButton}
                    >
                      register
                    </Button>
                  </div>
                )}
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const style = {
  category: {
    width: "100%",
    height: "50px",
    backgroundColor: "#fff",
    marginTop: "50px",
    position: "fixed",
    zIndex: "99",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #eaeaea",
  },
  categoryItem: {
    textDecoration: "none",
    color: "#424242",
    backgroundColor: "#eaeaea",
    padding: "5px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    marginRight: "5px",
  },
  badgeCart: {
    borderRadius: "50px",
    border: "2px solid #fff",
    position: "absolute",
    marginTop: "10px",
    marginLeft: "-5px",
    fontSize: "10px",
  },
  navbar: {
    padding: "2px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #eaeaea",
    boxShadow:
      "0 0px 0px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  },
  navbarLogo: {
    height: "30px",
  },
  searchForm: {
    padding: "5px 15px",
    borderRadius: "7px",
  },
  searchIcon: {
    position: "relative",
    right: 0,
    marginLeft: "-40px",
    marginTop: "7px",
  },
  navbarLink: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#475569",
  },
  navIcon: {
    color: "#9CA3AF",
    fontSize: "16px",
  },
  navRegButton: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#fff",
    backgroundColor: "#3554d1",
    border: "none",
    padding: "10px 15px",
  },
  navLoginButton: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#0275d8",
    backgroundColor: "#fff",
    border: "2px solid #0275d8",
    padding: "8px 10px",
  },
  navUserButton: {
    backgroundColor: "#F3F4F6",
    padding: "3px 5px",
    paddingRight: "10px",
    margin: "3px",
    marginLeft: "10px",
    borderRadius: "5px",
  },
  navUserName: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#475569",
    marginLeft: "8px",
    marginRight: "5px",
  },

  dropdownItem: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#475569",
    padding: "5px 15px",
  },
  dropdownMenu: {
    border: "1px solid #eaeaea",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },

  // cart
  cartQuickView: {
    width: "200px",
    height: "200px",
    position: "fixed",
    zIndex: "99",
    right: "0",
    marginRight: "470px",
    marginTop: "60px",
    borderRadius: "7px",
    backgroundColor: "#fff",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },

  actionBtn: {},
};

const mapStateToProps = (state) => {
  return {
    username: state.userReducer.username,
  };
};

export default connect(mapStateToProps, { logout })(NavigationBar);
