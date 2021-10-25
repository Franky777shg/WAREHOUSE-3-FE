import React from "react";
import {
  Card,
  Image,
  Alert,
  Button,
  Modal,
  Row,
  Form,
  Col,
} from "react-bootstrap";
import Axios from "axios";

export default class History extends React.Component {
  render() {
    return (
      <Card className="border-0">
        <Card.Header className="bg-white border-0 p-2">
          <span style={style.cardHeading}>History</span>
        </Card.Header>
      </Card>
    );
  }
}

const style = {
  cardHeading: {
    fontWeight: "600",
    fontSize: "18px",
  },
};
