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

class Success extends React.Component {
  render() {
    return (
      <div>
        <Container style={style.cardContainer}>
          <div>
            <Stack
              gap={2}
              style={style.cardWrapper}
              className="col-md-5 mx-auto my-auto"
            >
              <div className="text-center ">
                <h4 className="primaryColor">{this.props.title}</h4>
                <p className="primaryColor">{this.props.body}</p>
              </div>
              <Image src={this.props.img} style={style.cardHeroImage} />

              <Button
                style={style.myButton}
                as={Link}
                to={this.props.backTo.to}
                variant="primary"
                size="md"
                className="mt-3"
              >
                Back to {this.props.backTo.title}
              </Button>
            </Stack>
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
    width: "80%",
  },
  myButton: {
    width: "100%",
    border: "none",
    padding: "10px",
    fontWeight: "500",
    backgroundColor: "#3554D1",
    borderRadius: "8px",
  },
};

export default Success;
