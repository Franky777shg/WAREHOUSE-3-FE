import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
  Alert,
} from "react-bootstrap";
import heroImage from "../../assets/img/login hero/loginhero5.png";
import axios from "axios";
const BASE_URL = "http://localhost:2000";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      showConfirmPassword: false,
      nameEmpty: [false, ""],
      emailEmpty: [false, ""],
      usernameEmpty: [false, ""],
      passwordEmpty: [false, ""],
      password2Empty: [false, ""],
      registerSuccess: false,
    };
  }

  onRegister = (e) => {
    e.preventDefault();
    let userRegisterData = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      username: this.refs.username.value,
      password: this.refs.password.value,
      confirmPassword: this.refs.confirmpassword.value,
    };

    let obj = {
      name: userRegisterData.name,
      email: userRegisterData.email,
      username: userRegisterData.username,
      password: userRegisterData.password,
      status: "pending",
    };

    if (userRegisterData.name === "") {
      this.setState({ nameEmpty: [true, "Fullname is required"] });
    }
    if (userRegisterData.email === "") {
      this.setState({ emailEmpty: [true, "Email is required"] });
    }
    if (userRegisterData.username === "") {
      this.setState({ usernameEmpty: [true, "Username is required"] });
    }
    if (userRegisterData.password === "") {
      this.setState({ passwordEmpty: [true, "Password is required"] });
    }
    if (userRegisterData.confirmPassword === "") {
      this.setState({ password2Empty: [true, "Password is required"] });
    } else {
      this.submitData(obj);
    }
  };

  submitData = (registerData) => {
    axios.post(`${BASE_URL}/user/auth/register`, registerData).then((res) => {
      if (res.status === 200) {
        const email = res.data.message;
        this.setState({ registerSuccess: true });
        window.setTimeout(function () {
          window.location.href = `/auth/register_success/${email}`;
        }, 1500);
      }
    });
  };

  render() {
    return (
      <div>
        <Container fluid>
          <Row style={style.loginContainer}>
            <Col style={style.loginHero}>
              <Image
                style={style.loginHeroImage}
                src={heroImage}
                className="animate__fadeInDown"
              ></Image>
            </Col>
            <Col style={style.loginForm}>
              <Form style={style.loginFormWrapper}>
                <div className="form-title mb-5">
                  <h2>Welcome to Ukea</h2>
                  <Form.Text muted>
                    Plese fill form below to register your account
                  </Form.Text>
                </div>

                <Alert show={this.state.registerSuccess} variant="success">
                  <strong>Success,</strong> Register success!
                </Alert>

                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Enter Full Name"
                    ref="name"
                    isInvalid={this.state.nameEmpty[0]}
                    onChange={(e) => {
                      this.setState({ nameEmpty: [false, ""] });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {this.state.emailEmpty[1]}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    className="mt-3"
                    placeholder="Enter email"
                    ref="email"
                    isInvalid={this.state.emailEmpty[0]}
                    onChange={(e) => {
                      this.setState({ emailEmpty: [false, ""] });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {this.state.emailEmpty[1]}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    className="mt-3"
                    placeholder="Enter username"
                    ref="username"
                    isInvalid={this.state.usernameEmpty[0]}
                    onChange={(e) => {
                      this.setState({ usernameEmpty: [false, ""] });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {this.state.usernameEmpty[1]}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type={this.state.showPassword ? "text" : "password"}
                    className="mt-3"
                    placeholder="Password"
                    ref="password"
                    isInvalid={this.state.passwordEmpty[0]}
                    onChange={(e) => {
                      this.setState({ passwordEmpty: [false, ""] });
                    }}
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

                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type={this.state.showConfirmPassword ? "text" : "password"}
                    className="mt-3"
                    placeholder="Password"
                    ref="confirmpassword"
                    isInvalid={this.state.password2Empty[0]}
                    onChange={(e) => {
                      this.setState({ password2Empty: [false, ""] });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {this.state.password2Empty[1]}
                  </Form.Control.Feedback>
                  {!this.state.password2Empty[0] ? (
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          showConfirmPassword: !this.state.showConfirmPassword,
                        });
                      }}
                      className="search-icon"
                      style={style.showMyPasswordButton}
                    >
                      {this.state.showConfirmPassword ? (
                        <i className="fas fa-eye-slash"></i>
                      ) : (
                        <i className="fas fa-eye"></i>
                      )}
                    </a>
                  ) : (
                    <></>
                  )}
                </Form.Group>

                <div style={style.regForgetPass} className="mt-4">
                  <Form.Text as={Link} to="/auth/login" muted>
                    I have my account
                  </Form.Text>
                </div>

                <div className="d-grid gap-2 mt-2">
                  <Button
                    variant="default"
                    type="submit"
                    style={style.authButton}
                    block
                    onClick={this.onRegister}
                  >
                    create my account
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const style = {
  loginContainer: {
    backgroundColor: "#fff",
    width: "100vw",
    height: "100vh",
  },
  loginWrapper: {
    display: "flex",
    backgroundColor: "yellow",
    flexDirection: "row",
  },
  loginHero: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirections: "row",
    backgroundColor: "#4F46E5",
    color: "#fff",
  },
  loginHeroImage: {
    width: "80%",
  },
  thirdLogin: {
    display: "flex",
  },

  loginFormWrapper: {
    width: "50%",
  },
  loginForm: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

  loginForgetPass: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    textDecoration: "none",
    fontSize: "13px",
  },
  authButton: {
    backgroundColor: "#0275d8",
    color: "#fff",
  },
};

export default RegisterPage;
