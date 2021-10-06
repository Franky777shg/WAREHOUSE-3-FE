import React from "react";
import { Link } from "react-router-dom";
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

class VerifPage extends React.Component {
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
                <p className="mt-3 text-secondary">
                  We have sent a verification link to <br />
                  <strong>hendraadem@gmail.com</strong>
                </p>
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
