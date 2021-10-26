import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userLogin } from "../../redux/actions";
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
      this.props.userLogin(userLoginData.email, userLoginData.password);
    }
  };

  render() {
    if (this.props.username) {
      return <Redirect to="/" />;
    }
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

                <div className="form-title mb-4 mt-6">
                  <h2>Welcome back!</h2>
                  <Form.Text muted>Plese login with your account</Form.Text>
                </div>

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

                <div style={style.loginForgetPass} className="mt-4">
                  <Form.Text as={Link} to="/auth/forgot" muted>
                    Forget password?
                  </Form.Text>
                  <Form.Text as={Link} to="/auth/register" muted>
                    You have no account?
                  </Form.Text>
                </div>

                <div className="d-grid gap-2">
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
  myButton: {
    border: "none",
    padding: "10px",
    fontWeight: 500,
    backgroundColor: "#3554d1",
    borderRadius: "8px",
  },
};

const mapStateToProps = (state) => {
  return {
    username: state.userReducer.username,
    loginFailed: state.userReducer.login_failed,
  };
};

export default connect(mapStateToProps, { userLogin })(LoginPage);
