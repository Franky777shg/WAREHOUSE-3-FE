import React from "react";
import { Row, Col, Card, Stack, Image } from "react-bootstrap";

export default class Info extends React.Component {
  render() {
    return (
      <Row style={style.row}>
        <div style={style.cardContainer}>
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
          </Stack>
        </div>
      </Row>
    );
  }
}

const style = {
  row: {
    width: "100%",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    width: "50%",
    height: "auto",
    margin: "20px",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardWrapper: {
    width: "400px",
    height: "auto",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
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
