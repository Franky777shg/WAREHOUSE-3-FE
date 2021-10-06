import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Stack,
  Image,
  Card,
} from "react-bootstrap";
import heroImage from "../../assets/img/login hero/loginhero5.png";
import axios from "axios";
const API_URL = "http://localhost:2000";

class VerifPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActivated: false,
    };
  }
  componentDidMount() {
    let email = this.props.match.params.email;
    const activateAccount = axios.get(
      `${API_URL}/user/auth/verification/${email}`,
      (err, res) => {
        if (err) console.log(err);
      }
    );
    if (activateAccount) {
      this.setState({ isActivated: true });
      if (this.state.isActivated == true) {
        setTimeout(function () {
          window.location.href = "/auth/login";
        }, 1000);
      }
    }
  }
  render() {
    return (
      <div>
        <Container style={style.verifContainer}>
          <div>
            <Stack
              gap={2}
              style={style.verifWrapper}
              className="col-md-5 mx-auto my-auto"
            >
              <Image
                style={style.verifHeroImage}
                src={heroImage}
                className="animate__fadeInDown"
              ></Image>
              <div className="mt-4 text-center">
                <h2>Welcome to Ukea</h2>
                <p className="mt-2 text-secondary">
                  Your account is now Active <br />
                </p>
                <Button className="my-2" as={Link} to="/auth/login">
                  Go to login page
                </Button>
              </div>
            </Stack>
          </div>
        </Container>
      </div>
    );
  }
}

const style = {
  verifContainer: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  verifWrapper: {
    border: "1px solid #F9FAFB",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  verifHeroImage: {
    width: "70%",
  },
};

export default VerifPage;
