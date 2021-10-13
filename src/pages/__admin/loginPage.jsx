import React from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { adminLogin, keepAdminLogin } from "../../redux/actions";

import loginHero from "../../assets/img/info/login.png";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      emailEmpty: [false, ""],
      passwordEmpty: [false, ""],
    };
  }

  onLogin = (e) => {
    e.preventDefault();
    let userLoginData = {
      email: this.refs.email.value,
      password: this.refs.password.value,
    };

    if (userLoginData.email === "") {
      this.setState({ emailEmpty: [true, "Email is required"] });
    }
    if (userLoginData.password === "") {
      this.setState({ passwordEmpty: [true, "Password is required"] });
    } else {
      this.props.adminLogin(userLoginData.email, userLoginData.password);
    }
  };

  render() {
    if (this.props.adminUsername) {
      return <Redirect to="/admin" />;
    }
    return (
      <Container style={style.container}>
        <div style={style.loginWrapper}>
          <img src={loginHero} style={{ width: "90%" }} />
          <Form style={{ width: "100%" }}>
            {this.props.loginFailed ? (
              <Alert variant="danger" dismissible>
                <strong>Login failed,</strong> check your account
              </Alert>
            ) : null}

            {this.props.username ? (
              <Alert variant="success" dismissible>
                <strong>Login success </strong>
              </Alert>
            ) : null}

            <Form.Group controlId="formBasicEmail" hasValidation>
              <Form.Label className="myLabel">Email</Form.Label>
              <Form.Control
                ref="email"
                type="email"
                placeholder="Email"
                required
                isInvalid={this.state.emailEmpty[0]}
                onChange={(e) =>
                  this.setState({
                    emailEmpty: [false, ""],
                  })
                }
              />
              <Form.Control.Feedback type="invalid">
                {this.state.emailEmpty[1]}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-2">
              <Form.Label className="myLabel">Password</Form.Label>
              <Form.Control
                type={this.state.showPassword ? "text" : "password"}
                placeholder="Password"
                ref="password"
                required
                isInvalid={this.state.passwordEmpty[0]}
                onChange={(e) =>
                  this.setState({
                    passwordEmpty: [false, ""],
                  })
                }
              />
              <Form.Control.Feedback type="invalid">
                {this.state.passwordEmpty[1]}
              </Form.Control.Feedback>
              {!this.state.passwordEmpty[0] ? (
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({
                      showPassword: !this.state.showPassword,
                    });
                  }}
                  className="search-icon"
                  style={style.showMyPasswordButton}
                >
                  {this.state.showPassword ? (
                    <i className="fas fa-eye-slash"></i>
                  ) : (
                    <i className="fas fa-eye"></i>
                  )}
                </a>
              ) : (
                <></>
              )}
            </Form.Group>

            <div className="d-grid gap-2 mt-4">
              <Button
                variant="primary"
                type="submit"
                style={style.myButton}
                onClick={this.onLogin}
                block
              >
                login
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    );
  }
}

const style = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginWrapper: {
    width: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  myButton: {
    border: "none",
    padding: "10px",
    fontWeight: 500,
    backgroundColor: "#3554d1",
    borderRadius: "8px",
  },

  showMyPasswordButton: {
    position: "relative",
    marginTop: "-30px",
    marginRight: "10px",
    float: "right",
    zIndex: "9999",
  },
  showMyPassword: {
    fontSize: "13px",
    marginTop: "4px",
  },
};

const mapStateToProps = (state) => {
  return {
    adminUsername: state.adminReducer.adminUsername,
    loginFailed: state.adminReducer.loginFailed,
  };
};

export default connect(mapStateToProps, { adminLogin, keepAdminLogin })(
  LoginPage
);
