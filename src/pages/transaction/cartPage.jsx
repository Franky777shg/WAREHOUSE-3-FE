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
  Badge,
} from "react-bootstrap";
import Axios from "axios";
import NavigationBar from "../../components/NavigationBar";

import PageTitle from "../../components/pageTitle";
import Checkout from "../../components/transaction/Checkout";
import Success from "../../components/Success";

import buySuccess from "../../assets/img/info/cart.png";

import { Redirect } from "react-router";
import utils from "../../assets/styles/utils.module.css";

const BASE_URL = "http://localhost:2000";

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartData: [],
      checkoutData: [],
      userAddress: [],
      totalPrice: 0,
      totalQty: 0,
      isCheckout: false,
      totalPricePerProduct: 0,
      isUpdated: false,

      selectedAddress: 0,
      userFullName: "",
      userEmail: "",
      addAddress: false,

      buySuccess: false,
    };
  }

  componentDidMount() {
    this.getCart();
    this.getUserData();
    this.getUserAddress();
  }

  getCart() {
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
        this.getCount();
        console.log(this.state.cartData);
      })
      .catch((err) => console.log(err));
  }
  getUserAddress() {
    let token = localStorage.getItem("token");
    let getCartData = {
      id_user: token,
    };
    Axios.post(`${BASE_URL}/transaction/getAddress`, getCartData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        this.setState({ userAddress: res.data });
        if (res.data.length < 3) this.setState({ addAddress: true });
      })
      .catch((err) => console.log(err));
  }
  getUserData() {
    let token = localStorage.getItem("token");
    let getCartData = {
      id_user: token,
    };
    Axios.post(`${BASE_URL}/transaction/getUserData`, getCartData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        this.setState({
          userFullName: res.data[0].full_name,
          userEmail: res.data[0].email,
        });
      })
      .catch((err) => console.log(err));
  }
  onDeleteCart = (type, cartID) => {
    const token = localStorage.getItem("token");
    if (type === "partial") {
      Axios.post(
        `${BASE_URL}/transaction/deleteCart/partial`,
        { cartID: cartID },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          this.setState({ cartData: res.data });
          this.getCount();
        })
        .catch((err) => console.log(err));
    }
    if (type === "full") {
      Axios.post(
        `${BASE_URL}/transaction/deleteCart/full`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          this.setState({ cartData: res.data });
        })
        .catch((err) => console.log(err));
    }
  };
  onDecreaseQty(qty, productID) {
    const token = localStorage.getItem("token");
    Axios.post(
      `${BASE_URL}/transaction/changeQty`,
      { updateQty: qty - 1, id_product: productID },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        this.setState({ cartData: res.data });
        this.getCount();
      })
      .catch((err) => console.log(err));
  }
  onIncreaseQty(qty, productID) {
    const token = localStorage.getItem("token");
    Axios.post(
      `${BASE_URL}/transaction/changeQty`,
      { updateQty: qty + 1, id_product: productID },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        this.setState({ cartData: res.data });
        this.getCount();
      })
      .catch((err) => console.log(err));
  }
  getCount() {
    let qtyTemp = 0;
    let totalPriceTemp = 0;

    this.state.cartData.map((item, index) => {
      qtyTemp += +item.quantity;
      totalPriceTemp += item.quantity * item.product_price;
    });

    this.setState({
      totalQty: qtyTemp,
      totalPrice: totalPriceTemp,
    });
  }
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
              <div style={style.productActionBtn}>
                <Button
                  variant="light"
                  style={style.productQtyBtn}
                  disabled={item.quantity === 1 ? true : false}
                  onClick={() =>
                    this.onDecreaseQty(item.quantity, item.id_product)
                  }
                >
                  -
                </Button>
                <Form.Control
                  type="text"
                  className="mr-1"
                  value={item.quantity}
                  style={style.productQty}
                />
                <Button
                  variant="light"
                  style={style.productQtyBtn}
                  disabled={item.quantity === 5 ? true : false}
                  onClick={() =>
                    this.onIncreaseQty(item.quantity, item.id_product)
                  }
                >
                  +
                </Button>
              </div>
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
                  this.onDeleteCart("partial", item.id_cart);
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
  checkoutHandler = () => {
    this.setState({ isCheckout: true });
  };
  addTransaction() {
    const token = localStorage.getItem("token");
    let date = new Date();
    let fullTime =
      date.getFullYear() +
      "-" +
      date.getMonth() +
      "-" +
      date.getDay() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();

    let unique =
      "ORD" + "-" + date.getMonth() + "" + Math.floor(Math.random() * 9999);

    let orderData = {
      id_address: this.state.selectedAddress,
      order_number: unique,
    };

    Axios.post(`${BASE_URL}/transaction/addTransaction/order`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data.message === "order_added") {
          let transactionData;
          this.state.cartData.map((item) => {
            transactionData = {
              order_number: unique,
              id_product: item.id_product,
              quantity: item.quantity,
              total_price: item.quantity * item.product_price,
            };

            Axios.post(
              `${BASE_URL}/transaction/addTransaction/detail`,
              transactionData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
              .then((res) => {
                if (res.data.message === "transaction_success") {
                  Axios.post(
                    `${BASE_URL}/transaction/addTransaction/add_default_payment`,
                    transactionData,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                    .then((res) => {
                      if (res.data.message === "add_default_payment_success") {
                        this.setState({ buySuccess: true });
                        this.onDeleteCart("full", 0);
                      }
                    })
                    .catch((err) => console.log(err));
                }
              })
              .catch((err) => console.log(err));
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <NavigationBar />
        {!this.state.buySuccess && <PageTitle pageTitle="Shopping Cart" />}
        {this.state.cartData.length < 1 ? (
          <Success
            title="Cart Empty"
            body={`Your cart is empty`}
            img={buySuccess}
            backTo={{ title: "browse product", to: "/product" }}
          />
        ) : (
          <div className="container p-0">
            {this.state.buySuccess && (
              <Success
                title="Order success"
                body={`Your order success, please complete payment`}
                img={buySuccess}
                backTo={{ title: "payment page", to: "/profile/transaction" }}
              />
            )}

            {!this.state.buySuccess && (
              <div className="cart-wrapper" style={style.cartWrapper}>
                <Row>
                  <Col sm={8}>
                    <Card style={style.checkoutWrapper}>
                      {!this.state.isCheckout && (
                        <div>
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
                        </div>
                      )}

                      {/* checkout is true */}
                      {this.state.isCheckout && (
                        <div className="m-4">
                          <Form>
                            <span style={style.cartHeading}>Contact Info</span>
                            <Row className="mb-3 mt-2">
                              <Form.Group as={Col}>
                                <Form.Label className="myLabel">
                                  Fullname
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  value={this.state.userFullName}
                                  placeholder="Enter fullname"
                                />
                              </Form.Group>

                              <Form.Group as={Col}>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter your phone number"
                                />
                              </Form.Group>

                              <Form.Group as={Col}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                  type="email"
                                  value={this.state.userEmail}
                                  placeholder="Enter your email"
                                />
                              </Form.Group>
                            </Row>
                          </Form>

                          <Form>
                            <span style={style.cartHeading}>
                              Delivery Details
                            </span>
                            <Row className="mb-3 mt-2">
                              {this.state.userAddress.map((item) => {
                                console.log(this.state.selectedAddress);
                                return (
                                  <Form.Group as={Col}>
                                    <Card
                                      onClick={() => {
                                        this.setState({
                                          selectedAddress: item.id_address,
                                        });
                                      }}
                                      className={
                                        this.state.selectedAddress ===
                                        item.id_address
                                          ? utils.selectedUserAddress
                                          : utils.addressCard
                                      }
                                    >
                                      <span>
                                        <i className="fas fa-home"></i>
                                        <span className="addressType">
                                          {item.address_type}
                                        </span>
                                        {item.status_aktif === "default" && (
                                          <Badge
                                            bg="success"
                                            style={{
                                              position: "relative",
                                              marginLeft: "5px",
                                            }}
                                          >
                                            Default
                                          </Badge>
                                        )}
                                      </span>
                                      <span className="mt-2">
                                        <p className="addressName">
                                          {item.package_recipient}, <br />
                                          {item.address}
                                        </p>
                                      </span>
                                    </Card>
                                  </Form.Group>
                                );
                              })}

                              {this.state.addAddress && (
                                <Form.Group as={Col}>
                                  <Card
                                    style={style.addNewAddress}
                                    className={utils.addressCard}
                                  >
                                    <i className="fas fa-plus-square "></i>{" "}
                                    <span style={{ marginLeft: "8px" }}>
                                      Add new address
                                    </span>
                                  </Card>
                                </Form.Group>
                              )}
                            </Row>
                          </Form>

                          <Form>
                            <span style={style.cartHeading}>
                              Payment Method
                            </span>
                            <Row className="mb-3 mt-2">
                              <Form.Group as={Col}>
                                <Form.Select>
                                  <option>Select method</option>
                                  <option>Bank Transfer</option>
                                </Form.Select>
                              </Form.Group>
                            </Row>
                          </Form>
                        </div>
                      )}
                    </Card>
                  </Col>

                  {/* Order Summary */}
                  <Col sm={4}>
                    <Card style={style.checkoutWrapper}>
                      <Card.Header className="bg-white border-0 p-3">
                        <span style={style.cartHeading}> Order Summary </span>
                      </Card.Header>
                      <Card.Body style={style.cartTotalBody}>
                        <p className="mb-0">
                          Total price :{" "}
                          <span className="float-right">
                            Rp {this.state.totalPrice.toLocaleString()}
                          </span>
                        </p>

                        <p>
                          Shipping fee :{" "}
                          <span className="float-right">Rp 0</span>
                        </p>

                        <hr />
                        <p>
                          <strong>Total:</strong>
                          <span
                            className="float-right"
                            style={style.totalPaymentText}
                          >
                            <strong>
                              Rp {this.state.totalPrice.toLocaleString()}
                            </strong>
                          </span>
                        </p>

                        <div className="d-grid gap-2">
                          <Button
                            block
                            variant="primary"
                            style={style.btnCheckOut}
                            onClick={() => {
                              {
                                this.state.isCheckout
                                  ? this.addTransaction()
                                  : this.checkoutHandler();
                              }
                            }}
                          >
                            {this.state.isCheckout
                              ? "Place my order"
                              : "Checkout"}
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}
          </div>
        )}
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

  // action button
  productActionBtn: {
    display: "flex",
    bottom: "0",
    width: "100%",
  },
  productQty: {
    width: "50px",
    margin: "0 7px",
    border: "1px solid #eaeaea",
  },
  productQtyBtn: {
    border: "1px solid #eaeaea",
    backgroundColor: "#fff",
    padding: "4px 4px",
  },
};

export default CartPage;
