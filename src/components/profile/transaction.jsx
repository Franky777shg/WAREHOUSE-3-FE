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
  Alert,
} from "react-bootstrap";

import { Link } from "react-router-dom";
import Info from "../Info";
const BASE_URL = "http://localhost:2000";
const token = localStorage.getItem("token");
const Error =
  "https://firebasestorage.googleapis.com/v0/b/e-commerce-f95d6.appspot.com/o/info%2Ferror.png?alt=media&token=cb31b07e-6bc7-4fb8-aa56-41ac6a50bb0c";

export default class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      orderDetail: [],
      totalPrice: 0,
      shippingFee: 0,
      grandTotal: 0,
      isGetDetail: false,
      orderNumber: null,
      isPaymentProcessed: false,
      orderStatus: null,
    };
  }
  componentDidMount() {
    this.getOrder();
  }

  getOrder() {
    Axios.post(
      `${BASE_URL}/transaction/getOrder`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        let temp = res.data.map((item) => {
          this.setState({ orderNumber: item.order_number });
          this.getPaymentStatus();
          this.getOrderStatus();
          const getDetailOrder = async () => {
            try {
              const res = await Axios.post(
                `${BASE_URL}/transaction/getOrderDetail`,
                { order_number: item.order_number },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              return res.data;
            } catch (error) {
              console.log(error);
            }
          };

          getDetailOrder().then((res) => {
            let tmp = res;
            item.order_detail = tmp;
          });

          return item;
        });

        this.setState({ order: temp });
        setTimeout(() => {
          this.setPayInfo();
        }, 1000);

        console.log(this.state.order);
      })
      .catch((err) => console.log(err));
  }
  getCount() {
    this.state.orderDetail.map((item, index) => {
      this.setState({
        totalPrice:
          this.state.totalPrice + parseInt(item.product_price * item.quantity),
      });
    });
  }

  detailHandler(order_number) {
    this.setState({ isGetDetail: true });
  }

  getPaymentStatus() {
    let order_number = this.state.orderNumber;
    Axios.post(`${BASE_URL}/transaction/getPaymentStatus`, {
      order_number: order_number,
    })
      .then((res) => {
        console.log(res.data);
        if (res) {
          if (res.data[0].status === "processed") {
            this.setState({ isPaymentProcessed: true });
          } else {
            this.setState({ isPaymentProcessed: false });
          }
        }
      })
      .catch((err) => console.log(err));
  }

  getOrderStatus() {
    let order_number = this.state.orderNumber;
    Axios.post(`${BASE_URL}/transaction/getOrderStatus`, {
      order_number: order_number,
    })
      .then((res) => {
        console.log(res.data);
        if (res) {
          this.setState({ orderStatus: res.data[0].status });
        }
      })
      .catch((err) => console.log(err));
  }

  acceptMyOrder() {
    let order_number = this.state.orderNumber;
    Axios.post(`${BASE_URL}/transaction/orderArrived`, {
      order_number: order_number,
    })
      .then((res) => {
        if (res.data.message === "update_success") {
          this.getOrder();
        }
      })
      .catch((err) => console.log(err));
  }

  setPayInfo() {
    let totalPrice = 0;
    let data = this.state.order;
    data.map((item) => {
      let temp;
      temp = item.order_detail;
      temp.map((detail) => {
        totalPrice += +detail.total_price;
        this.setState({
          totalPrice: totalPrice,
          shippingFee: detail.shipping_fee,
        });

        localStorage.setItem(
          "grandtotal",
          +totalPrice + parseInt(detail.shipping_fee)
        );
      });
    });
  }

  render() {
    return (
      <div>
        <Card className="border-0">
          <Card.Header className="bg-white border-0 p-2">
            <span style={style.cartHeading}>Your Ongoing Transaction</span>

            {this.state.order.length < 1 && <Info img={Error} />}

            {this.state.order.map((item) => {
              return (
                <Card.Body className="p-2 mt-2">
                  <Card>
                    <Card.Header style={style.cardHeader}>
                      <div style={style.centered}>
                        <strong>Transaction ID : {item.order_number}</strong>
                        {this.state.isPaymentProcessed ? (
                          <Badge bg="primary" className="mx-2">
                            Pembayaran diterima
                          </Badge>
                        ) : (
                          <Badge bg="warning" className="mx-2 text-black">
                            Menunggu pembayaran
                          </Badge>
                        )}
                        <Badge bg="primary">
                          order {this.state.orderStatus}
                        </Badge>
                      </div>
                      <div>
                        {this.state.isPaymentProcessed ? null : (
                          <Button
                            size="sm"
                            variant="primary"
                            as={Link}
                            target="_blank"
                            to={`/payment/${item.order_number}`}
                          >
                            <i class="fas fa-wallet"></i> Pay now
                          </Button>
                        )}
                        {/* <Button
                          size="sm"
                          className="mx-1"
                          variant="primary"
                          onClick={() => {
                            this.detailHandler(item.order_number);
                          }}
                        >
                          Detail
                        </Button> */}
                        {this.state.isPaymentProcessed ? (
                          <Button
                            size="sm"
                            className="mx-2"
                            variant="primary"
                            onClick={() => {
                              this.acceptMyOrder();
                            }}
                          >
                            Receive my order
                          </Button>
                        ) : null}
                      </div>
                    </Card.Header>
                    <div>
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
                                <strong>Shipping :</strong> Rp
                                {this.state.shippingFee.toLocaleString()}
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
                            <p className="text-muted small">{item.address}</p>
                          </Col>
                          <Col sm={4}>
                            <h6 className="text-muted">Contact</h6>
                            <p className="text-muted small">
                              {item.package_recipient} <br />
                              {item.address_phone}
                            </p>
                          </Col>
                        </Row>
                      </Card.Body>
                    </div>
                  </Card>
                </Card.Body>
              );
            })}
          </Card.Header>
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
