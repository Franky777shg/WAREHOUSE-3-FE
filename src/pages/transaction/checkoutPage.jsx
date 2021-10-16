import React from "react";
import {
  Row,
  Col,
  Card,
  Image,
  Button,
  Form,
  Modal,
  InputGroup,
  Table,
  Figure,
  Alert,
} from "react-bootstrap";
import Axios from "axios";
import NavigationBar from "../../components/NavigationBar";

import PageTitle from "../../components/pageTitle";

const BASE_URL = "http://localhost:2000";

class CheckoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartData: [],
      totalPrice: 0,
      totalQty: 0,
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    let getCartData = {
      id_user: token,
    };
    Axios.post(`${BASE_URL}/transaction/getCart`, getCartData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        this.setState({ cartData: res.data });
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  qtyOnChange = (e, currentProductQty, currentProductStock) => {
    e.target.value = this.state.productQty;
    console.log(e.target.value);
  };
  onDeleteCart = (userID, productID) => {
    this.props.deleteCart(userID, productID);
  };

  fetchCartData = () => {
    return this.state.cartData.map((item, index) => {
      return (
        <tbody>
          <tr>
            <td>
              <Figure style={{ display: "flex" }}>
                <div style={{ marginRight: "15px" }}>
                  <Figure.Image
                    width={70}
                    height={70}
                    src={`http://localhost:2000/products/${item.productimg}`}
                  />
                </div>
                <Figure.Caption>
                  <a href="" style={style.productTitle}>
                    {item.product_name}
                  </a>
                  <p className="text-muted small">
                    Size: XL, Color: blue, <br />
                    Rp {item.product_price.toLocaleString()}
                  </p>
                </Figure.Caption>
              </Figure>
            </td>
            <td>
              <Form.Control
                type="number"
                className="mr-1"
                value={item.quantity}
                style={style.productQty}
                onChange={(e) => this.qtyOnChange(e, item.qty, item.stock)}
              />
            </td>
            <td>
              <p style={style.productPrice}>
                Rp {(item.quantity * item.product_price).toLocaleString()}
              </p>
            </td>
            <td>
              <Button
                variant="light"
                size="md"
                className="mx-2"
                style={style.btnCardActionBtn}
              >
                <i class="fas fa-heart"></i>
              </Button>
              <Button
                variant="light"
                size="md"
                style={style.btnCardActionBtn}
                onClick={() => {
                  this.onDeleteCart(this.props.userID, index);
                }}
              >
                <i class="fas fa-trash"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <PageTitle pageTitle="Shopping Cart" />
        <div className="container p-0">
          <div className="cart-wrapper" style={style.cartWrapper}>
            <Row>
              <Col sm={8}>
                <Card style={style.checkoutWrapper}>
                  <Card.Header className="bg-white border-0 p-3">
                    <span style={style.cartHeading}>Your cart</span>
                  </Card.Header>
                  <div className="m-2">
                    <Table borderless>
                      <thead>
                        <tr>
                          <th style={style.tableHeading}>Product</th>
                          <th style={style.tableHeading}>Quantity</th>
                          <th style={style.tableHeading}>Price</th>
                        </tr>
                      </thead>
                      {this.fetchCartData()}
                    </Table>
                  </div>
                </Card>
              </Col>
              <Col sm={4}>
                <Card style={style.checkoutWrapper}>
                  <Card.Header className="bg-white border-0 p-3">
                    <span style={style.cartHeading}> Order Summary </span>
                  </Card.Header>
                  <Card.Body style={style.cartTotalBody}>
                    <p className="mb-0">
                      Total price:{" "}
                      <span className="float-right">Rp 4.530.000</span>
                    </p>
                    <p>
                      Discount: <span className="float-right">0%</span>
                    </p>

                    <hr />
                    <p>
                      <strong>Total:</strong>
                      <span
                        className="float-right"
                        style={style.totalPaymentText}
                      >
                        <strong>Rp 4.530.000</strong>
                      </span>
                    </p>

                    <div className="d-grid gap-2">
                      <Button
                        block
                        variant="primary"
                        style={style.btnCheckOut}
                        onClick={() => {
                          this.setState({ checkoutAuthModal: true });
                        }}
                      >
                        Checkout
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const style = {
  cartWrapper: {
    backgroundColor: "#fff",
    marginBottom: "200px",
    marginTop: "20px",
    padding: "20px",
  },
  productCard: {
    padding: "7px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "8px",
    border: "none",
  },

  productCardImgWrapper: {
    width: "25%",
    height: "90px",
    padding: "8px",
    borderRadius: "5px",
    marginRight: "15px",
  },
  productCardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "5px",
  },

  productCardDetailWrapper: {
    width: "80%",
  },
  productTitle: {
    fontSize: "15px",
    marginTop: "3px",
    marginBottom: "2px",
    color: "#212529",
    textDecoration: "none",
    fontWeight: "500",
  },
  productSize: {
    fontSize: "11px",
    marginBottom: "0",
    color: "#9CA3AF",
  },
  productPrice: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#212529",
    marginBottom: "0",
  },

  // action btn
  productActionBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    marginRight: "20px",
  },
  productQty: {
    width: "80px",
    border: "1px solid #eaeaea",
    padding: "5px",
    paddingLeft: "10px",
    borderRadius: "6px",
  },
  productQtyBtn: {
    border: "1px solid #eaeaea",
    backgroundColor: "#fff",
    padding: "0 7px",
  },
  addToCartBtn: {
    fontSize: "14px",
    fontWeight: "500",
  },
  btnCardActionBtn: {
    backgroundColor: "#fff",
    border: "1px solid #eaeaea",
    fontWeight: "500",
    color: "#9CA3AF",
    fontSize: "15px",
    padding: "5px 10px",
    borderRadius: "6px",
  },

  cartTotalBody: {
    fontSize: "14px",
    color: "#31353b",
  },
  totalPaymentText: {
    color: "#fa591d",
  },
  btnCheckOut: {
    border: "none",
    padding: "10px",
    fontWeight: 500,
    backgroundColor: "#3554d1",
    borderRadius: "8px",
  },

  checkoutWrapper: {
    border: "none",
    border: "1px solid #F3F4F6",
    borderRadius: "8px",
    boxShadow: "0 1px 3px 0px rgba(0, 0, 0, 0.05)",
  },

  tableHeading: {
    textTransform: "uppercase",
    color: "#6B7280",
    fontSize: "12px",
  },

  cartHeading: {
    fontWeight: "600",
    fontSize: "18px",
  },
};

export default CheckoutPage;
