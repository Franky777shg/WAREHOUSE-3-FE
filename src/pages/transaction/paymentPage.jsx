import React from "react";
import NavigationBar from "../../components/NavigationBar";
import { Container, Row, Card, Button, Col, Image } from "react-bootstrap";

export default class PaymentPage extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Container>
          <Row
            className="d-flex justify-content-center "
            style={{ marginTop: "80px" }}
          >
            <Col sm={6}>
              <Card>
                <Card.Header className="bg-white p-3 d-flex justify-space-between">
                  <span>
                    <strong>Transfer manual - Mandiri</strong>
                  </span>
                  <Image src="../"></Image>
                </Card.Header>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
