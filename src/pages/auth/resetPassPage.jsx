import React from "react";
import { Form, Button, Container, Stack } from "react-bootstrap";
import Axios from "axios";

import "../../assets/styles/utils.css";
import "../../assets/styles/auth.css";
import Success from "../../components/Success";
import resetSuccess from "../../assets/img/info/registersuccess.png";
const BASE_URL = "https://api-warehouse-3.purwadhikafs2.com";

class ResetPassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEmailMethod: false,
      errorAlert: false,
      showPassword: false,
      showConfirmPassword: false,
      passwordEmpty: false,
      confirmPasswordEmpty: false,
      passwordChanged: false,
    };
  }

  changePasswordHandler(e) {
    const token = this.props.match.params.emailToken;

    let changeData = {
      password: this.refs.password.value,
    };
    if (changeData.password === "") this.setState({ passwordEmpty: true });
    if (changeData.confirmPassword === "")
      this.setState({ confirmPasswordEmpty: true });

    Axios.post(`${BASE_URL}/user/auth/reset`, changeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data.message === "password_changed")
          this.setState({ passwordChanged: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Container style={style.cardContainer}>
          <div>
            {this.state.passwordChanged ? (
              <Success
                title="Password Changed"
                body={`Your password changed, please login`}
                img={resetSuccess}
                backTo={{ title: "login", to: "/auth/login" }}
              />
            ) : (
              <Stack
                gap={2}
                style={style.cardWrapper}
                className="col-md-5 mx-auto my-auto"
              >
                <div className="text-center mt-2">
                  <h3 className="primaryColor">Reset Password</h3>
                  <p className="text-secondary">Reset your password</p>
                </div>

                <Form.Group style={{ width: "100%" }}>
                  <Form.Label className="myLabel">New password</Form.Label>
                  <Form.Control
                    ref="password"
                    type={this.state.showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    isInvalid={this.state.passwordEmpty}
                    onChange={(e) =>
                      this.setState({
                        passwordEmpty: false,
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    This form is required
                  </Form.Control.Feedback>
                  {!this.state.passwordEmpty ? (
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

                <Form.Group style={{ width: "100%" }} className="mt-2">
                  <Form.Label className="myLabel">
                    Confirm new password
                  </Form.Label>
                  <Form.Control
                    ref="confirmPassword"
                    type={this.state.showConfirmPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    isInvalid={this.state.confirmPasswordEmpty}
                    onChange={(e) =>
                      this.setState({
                        confirmPasswordEmpty: false,
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    This form is required
                  </Form.Control.Feedback>
                  {!this.state.confirmPasswordEmpty ? (
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

                <Button
                  style={style.myButton}
                  variant="primary"
                  size="md"
                  className="mt-3"
                  onClick={(e) => {
                    this.changePasswordHandler();
                  }}
                >
                  Change my password
                </Button>
              </Stack>
            )}
          </div>
        </Container>
      </div>
    );
  }
}

const style = {
  cardContainer: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardWrapper: {
    width: "400px",
    height: "auto",
    border: "1px solid #F9FAFB",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  cardHeroImage: {
    width: "70%",
  },
  cardResetMethod: {
    width: "100%",
    border: "1px solid #D1D5DB",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "row",
  },
  selectedCardResetMethod: {
    width: "100%",
    border: "1px solid #627EEF",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f7f9ff",
  },
  emailInput: {
    borderRadius: "8px",
    padding: "8px 10px",
  },
  myButton: {
    width: "100%",
    border: "none",
    padding: "10px",
    fontWeight: "500",
    backgroundColor: "#3554D1",
    borderRadius: "8px",
  },
  icon: {
    color: "#3554D1",
  },
  iconWrapper: {
    backgroundColor: "coral",
    width: "30px",
    height: "30px",
    borderRadius: "50px",
    textAlign: "center",
    lineHeight: "1.42857",
  },
  warningAlert: {
    width: "100%",
    padding: "9px",
    margin: "0",
  },
  showMyPasswordButton: {
    position: "relative",
    marginTop: "-30px",
    marginRight: "10px",
    float: "right",
    zIndex: "9999",
  },
};

export default ResetPassPage;
