import React from "react";
import Axios from "axios";
import {
  Card,
  Table,
  Badge,
  Row,
  Col,
  Figure,
  ListGroup,
  ListGroupItem,
  Image,
  Button,
} from "react-bootstrap";

import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:2000";

export default class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionData: [],
      transactionInfo: [],
      totalPrice: 0,
    };
  }
  componentDidMount() {
    this.fetchTransaction();
  }

  fetchTransaction() {
    const token = localStorage.getItem("token");
    Axios.post(
      `${BASE_URL}/transaction/getTransaction`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        this.setState({ transactionData: res.data });
        this.setState({ transactionInfo: res.data[0] });
        this.getCount();
      })
      .catch((err) => console.log(err));
  }

  getCount() {
    return this.state.transactionData.map((item, index) => {
      this.setState({
        totalPrice:
          this.state.totalPrice + parseInt(item.product_price * item.quantity),
      });
    });
  }

  render() {
    return (
      <div>
        <Card className="border-0">
          <Card.Header className="bg-white border-0 p-2">
            <span style={style.cartHeading}>Your Ongoing Transaction</span>
          </Card.Header>
          <Card.Body className="p-2">
            <Card>
              <Card.Header style={style.cardHeader}>
                <div style={style.centered}>
                  <strong>
                    Transaction ID : {this.state.transactionInfo.order_number}
                  </strong>
                  {this.state.transactionInfo.payment_status === "unpaid" && (
                    <Badge bg="danger" className="mx-2">
                      <i className="far fa-credit-card mr-3"></i>
                      <span className="mx-2">
                        {this.state.transactionInfo.payment_status === "unpaid"
                          ? "Waiting for payment"
                          : null}
                      </span>
                    </Badge>
                  )}
                  {this.state.transactionInfo.payment_status === "paid" && (
                    <Badge bg="success" className="mx-2">
                      <i className="far fa-credit-card mr-3"></i>
                      {this.state.transactionInfo.payment_status === "paid"
                        ? "Processed"
                        : null}
                    </Badge>
                  )}
                </div>
                <div>
                  <Button size="sm" variant="primary">
                    <i class="fas fa-wallet"></i> Pay now
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col sm={4}>
                    <h6 className="text-muted">Payment</h6>
                    <p className="text-muted small">
                      <span>Bank Transfer</span> <br />
                      <span className="text-muted small">
                        <strong>Subtotal :</strong> Rp
                        {this.state.totalPrice.toLocaleString()}
                      </span>
                      <br />
                      <span className="text-muted small">
                        <strong>Shipping :</strong> Rp 210.000
                      </span>
                      <br />
                      <span className="text-muted small">
                        <strong>Total :</strong> Rp
                        {this.state.totalPrice.toLocaleString()}
                      </span>
                    </p>
                  </Col>
                  <Col sm={4}>
                    <h6 className="text-muted">Shipping address</h6>
                    <p className="text-muted small">
                      {this.state.transactionInfo.address}
                    </p>
                  </Col>
                  <Col sm={4}>
                    <h6 className="text-muted">Contact</h6>
                    <p className="text-muted small">
                      {this.state.transactionInfo.package_recipient} <br />
                      {this.state.transactionInfo.address_phone}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
              <ListGroup className="list-group-flush">
                {this.state.transactionData.map((item) => {
                  return (
                    <ListGroupItem style={{ padding: 0 }}>
                      <Table borderless responsive style={{ margin: 0 }}>
                        <tbody>
                          <tr style={{ margin: 0 }}>
                            <td width="30">
                              <Image
                                as={Link}
                                to="/"
                                width={30}
                                height={30}
                                style={{
                                  border: "1px solid #eaeaea",
                                  borderRadius: "5px",
                                }}
                                src={`http://localhost:2000/products/${item.productimg}`}
                              />
                            </td>
                            <td width="300">
                              <p style={style.productTitle}>
                                {item.product_name}
                              </p>
                              <p
                                className="text-muted"
                                style={style.productPrice}
                              >
                                Rp
                                {(
                                  +item.quantity * +item.product_price
                                ).toLocaleString()}
                              </p>
                            </td>
                            <td style={style.pushRight}>
                              {/* <Button size="sm" style={style.btnDetail}>
                                Detail
                              </Button> */}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </Card>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
const style = {
  cartHeading: {
    fontWeight: "600",
    fontSize: "18px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  productTitle: {
    fontSize: "12px",
    color: "#212529",
    textDecoration: "none",
    margin: 0,
  },
  productPrice: {
    fontSize: "12px",
    color: "#212529",
    textDecoration: "none",
    margin: 0,
  },
  pushRight: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },
  centered: {
    display: "flex",
    alignItems: "center",
  },
  btnDetail: {
    border: "none",
    padding: "8px",
    backgroundColor: "#3554d1",
    borderRadius: "4px",
  },
};

// <div class="table-responsive">
// 		<table class="table table-hover">
// 			<tbody><tr>
// 				<td width="65">
// 					<img src="bootstrap-ecommerce-html/images/items/1.jpg" class="img-xs border">
// 				</td>
// 				<td>
// 					<p class="title mb-0">Product name goes here </p>
// 					<var class="price text-muted">USD 145</var>
// 				</td>
// 				<td> Seller <br> Nike clothing </td>
// 				<td width="250"> <a href="#" class="btn btn-outline-primary">Track order</a> <a href="#" class="btn btn-light"> Details </a> </td>
// 			</tr>
// 			<tr>
// 				<td>
// 					<img src="bootstrap-ecommerce-html/images/items/2.jpg" class="img-xs border">
// 				</td>
// 				<td>
// 					<p class="title mb-0">Another name goes here </p>
// 					<var class="price text-muted">USD 15</var>
// 				</td>
// 				<td> Seller <br> ABC shop </td>
// 				<td> <a href="#" class="btn btn-outline-primary">Track order</a> <a href="#" class="btn btn-light"> Details </a> </td>
// 			</tr>
// 			<tr>
// 				<td>
// 					<img src="bootstrap-ecommerce-html/images/items/3.jpg" class="img-xs border">
// 				</td>
// 				<td>
// 					<p class="title mb-0">The name of the product  goes here </p>
// 					<var class="price text-muted">USD 145</var>
// 				</td>
// 				<td> Seller <br> Wallmart </td>
// 				<td> <a href="#" class="btn btn-outline-primary">Track order</a> <a href="#" class="btn btn-light"> Details </a> </td>
// 			</tr>
// 		</tbody></table>
// 		</div>
