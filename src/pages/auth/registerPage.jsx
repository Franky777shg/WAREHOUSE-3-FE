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
import Success from "../../components/Success";
import "../../assets/styles/utils.css";
import heroImage from "../../assets/img/login hero/loginhero5.png";
import regSuccessHero from "../../assets/img/info/login.png";
import Axios from "axios";
import { connect } from "react-redux";
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
      userExist: false,
    };
  }

  onRegister = (e) => {
    e.preventDefault();
    let userRegisterData = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      username: this.refs.username.value,
      password: this.refs.password.value,
    };

    let obj = {
      name: userRegisterData.name,
      email: userRegisterData.email,
      username: userRegisterData.username,
      password: userRegisterData.password,
      status: "pending",
    };

    let checkData = {
      email: userRegisterData.email,
      userStatus: "active",
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
    } else {
      this.submitData(obj, checkData);
    }
  };

  submitData = (registerData, checkData) => {
    Axios.post(`${BASE_URL}/user/check/user`, checkData)
      .then((res) => {
        if (res.data.message === "user_exist")
          this.setState({ userExist: true });
        else {
          Axios.post(`${BASE_URL}/user/auth/register`, registerData).then(
            (res) => {
              if (res.status === 200) {
                const email = res.data.message;
                this.setState({ registerSuccess: true });
              }
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (this.props.username) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Container fluid>
          {this.state.registerSuccess ? (
            <Success
              title="Register Success!"
              body={`We have sent an activation link to  
               ${this.refs.email.value} `}
              img={regSuccessHero}
              backTo={{ title: "home", to: "/" }}
            />
          ) : (
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

                  <Alert show={this.state.userExist} variant="danger">
                    <strong>Error,</strong> User already exist
                  </Alert>

                  <Form.Group controlId="formBasicEmail" className="mt-2">
                    <Form.Label className="myLabel">Full Name</Form.Label>
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
                      {this.state.nameEmpty[1]}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail" className="mt-2">
                    <Form.Label className="myLabel">Email</Form.Label>
                    <Form.Control
                      type="email"
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

                  <Form.Group controlId="formBasicEmail" className="mt-2">
                    <Form.Label className="myLabel">Username</Form.Label>
                    <Form.Control
                      type="text"
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

                  <Form.Group controlId="formBasicPassword" className="mt-2">
                    <Form.Label className="myLabel">Password</Form.Label>
                    <Form.Control
                      type={this.state.showPassword ? "text" : "password"}
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

                  <div style={style.regForgetPass} className="mt-4">
                    <Form.Text as={Link} to="/auth/login" muted>
                      I have my account
                    </Form.Text>
                  </div>

                  <div className="d-grid gap-2 mt-2">
                    <Button
                      style={style.myButton}
                      variant="primary"
                      type="submit"
                      className="myButton"
                      block
                      onClick={this.onRegister}
                    >
                      create my account
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          )}
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

export default connect(mapStateToProps)(RegisterPage);
