import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Stack, Card, Alert } from "react-bootstrap";
import Axios from "axios";

import "../../assets/styles/auth.css";
import heroImage from "../../assets/img/login hero/loginhero5.png";
import resetHero from "../../assets/img/info/chatbot.png";
import Success from "../../components/Success";

const BASE_URL = "http://localhost:2000";

class ForgotPassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEmailMethod: false,
      errorAlert: false,
      userNotFound: false,
      emailSent: false,
      userEmail: "",
    };
  }

  sendLinkHandler() {
    if (!this.state.selectedEmailMethod) {
      this.setState({ errorAlert: true });
    } else {
      let checkData = {
        email: this.refs.email.value,
        userStatus: "active",
      };

      Axios.post(`${BASE_URL}/user/check/user`, checkData)
        .then((res) => {
          if (res.data.message === "user_not_found")
            this.setState({ userNotFound: true });
          else {
            let userEmail = this.refs.email.value;
            Axios.post(`${BASE_URL}/user/auth/forgot`, { userEmail })
              .then((response) => {
                if (response.data.message === "email_sent") {
                  this.setState({ emailSent: true });
                  this.setState({ userEmail: checkData.email });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div>
        <Container style={style.cardContainer}>
          <div>
            {this.state.emailSent ? (
              <Success
                title="Reset link sent"
                body={`Reset link sent to ${this.state.userEmail}`}
                img={resetHero}
                backTo={{ title: "login", to: "/auth/login" }}
              />
            ) : null}

            {!this.state.emailSent ? (
              <Stack
                gap={2}
                style={style.cardWrapper}
                className="col-md-5 mx-auto my-auto"
              >
                <div className="text-center mt-2">
                  <h3>Forgot Password</h3>
                  <p className="text-secondary">
                    Please select password reset method
                  </p>
                </div>

                {this.state.errorAlert ? (
                  <Alert style={style.infoAlert} variant="danger">
                    Please select your reset method
                  </Alert>
                ) : null}

                {this.state.emailSent ? (
                  <Alert style={style.infoAlert} variant="success">
                    <i className="fas fa-check-circle"></i>
                    <span className="mx-2">
                      Email sent to
                      <strong> {this.refs.email.value}</strong>
                    </span>
                  </Alert>
                ) : null}

                <Card
                  className="p-3 card-reset-method"
                  style={
                    this.state.selectedEmailMethod
                      ? style.selectedCardResetMethod
                      : style.cardResetMethod
                  }
                >
                  <div className="card-icon">
                    <div>
                      {this.state.selectedEmailMethod ? (
                        <i
                          className="fas fa-check-circle"
                          style={style.icon}
                        ></i>
                      ) : (
                        <i className="fas fa-envelope" style={style.icon}></i>
                      )}
                    </div>
                  </div>
                  <div
                    className="card-content mx-3"
                    style={{ width: "100%" }}
                    onClick={(e) => {
                      this.setState({
                        selectedEmailMethod: !this.state.selectedEmailMethod,
                        errorAlert: false,
                      });
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: "18px", color: "#3554D1" }}>
                        Reset via email
                      </h4>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#9CA3AF",
                          margin: "0",
                        }}
                      >
                        Reset link will be send to your registered Email
                      </p>
                    </div>
                  </div>
                </Card>

                {this.state.selectedEmailMethod ? (
                  <Form.Group hasValidation style={{ width: "100%" }}>
                    <Form.Control
                      style={style.emailInput}
                      ref="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      isInvalid={this.state.userNotFound}
                      onChange={(e) =>
                        this.setState({
                          userNotFound: false,
                        })
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      User not found
                    </Form.Control.Feedback>
                  </Form.Group>
                ) : null}

                <Button
                  style={style.myButton}
                  variant="primary"
                  size="md"
                  className="mt-3"
                  onClick={(e) => {
                    this.sendLinkHandler();
                  }}
                >
                  Send Link
                </Button>
              </Stack>
            ) : null}
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
  infoAlert: {
    width: "100%",
    padding: "9px",
    margin: "0",
  },
};

export default ForgotPassPage;
