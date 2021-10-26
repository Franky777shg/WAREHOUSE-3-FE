import React from "react";
import Axios from "axios";
import { Row, Form, Col, Card, Button, Badge } from "react-bootstrap";
import utils from "../../assets/styles/utils.module.css";
import "../../assets/styles/checkout.css";

const BASE_URL = "http://localhost:2000";

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAddress: null,
      userAddress: [],
      userFullName: "",
      userEmail: "",
      addAddress: false,
    };
  }

  componentDidMount() {
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

  render() {
    return (
      <div>
        <Card style={style.checkoutWrapper}>
          <div className="m-4">
            <Form>
              <span style={style.cartHeading}>Contact Info</span>
              <Row className="mb-3 mt-2">
                <Form.Group as={Col}>
                  <Form.Label className="myLabel">Fullname</Form.Label>
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
              <span style={style.cartHeading}>Delivery Details</span>
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
                        className={` ${
                          this.state.selectedAddress === item.id_address
                            ? "selectedUserAddress"
                            : "addressCard"
                        }`}
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
                      <span style={{ marginLeft: "8px" }}>Add new address</span>
                    </Card>
                  </Form.Group>
                )}
              </Row>
            </Form>

            <Form>
              <span style={style.cartHeading}>Payment Method</span>
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
        </Card>
      </div>
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

  // Address
  addressCard: {
    width: "100%",
    height: "100%",
    border: "1px solid #eaeaea",
    padding: "12px",
  },
  addressType: {
    color: "#374151",
    fontWeight: "500",
    marginLeft: "5px",
  },
  addressName: {
    fontSize: "14px",
    color: "#4B5563",
  },

  addNewAddress: {
    width: "100%",
    height: "100%",
    border: "1px solid #eaeaea",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  selectedAddress: {
    width: "100%",
    height: "100%",
    border: "1px solid #3554d1",
    padding: "12px",
  },
};
