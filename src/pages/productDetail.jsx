import React from "react";
import Axios from "axios";
import NavigationBar from "../components/NavigationBar";
import { Image, Button, FormControl, Form, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { addToCart } from "../redux/actions";

const BASE_URL = "http://localhost:2000";

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 1,
      detailProd: null,
      maxStock: null,
      currentQty: 0,
      updateQty: 0,
      isAdded: false,
    };
  }

  componentDidMount() {
    let idProd = this.props.match.params.id;
    Axios.get(`${BASE_URL}/product/detail-product/${idProd}`)
      .then((res) => {
        this.setState({
          detailProd: res.data,
          maxStock: res.data.TotalStockAvail,
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onMinus = () => {
    this.setState({ qty: this.state.qty - 1 });
  };
  onPlus = () => {
    this.setState({ qty: this.state.qty + 1 });
  };
  onChangeQty = (e) => {
    let value = +e.target.value;
    let maxQty = this.state.detailProd.TotalStockAvail;

    if (value < 1) {
      this.setState({ qty: 1 });
    } else if (value > maxQty) {
      this.setState({ qty: maxQty });
    } else {
      this.setState({ qty: value });
    }
  };

  onAddToCart = () => {
    const token = localStorage.getItem("token");
    let totalPrice = this.state.qty * this.state.detailProd.product_price;

    let cartData = {
      id_product: this.state.detailProd.id_product,
      id_user: token,
      product_name: this.state.detailProd.product_name,
      product_price: totalPrice,
      quantity: this.state.qty,
    };

    let checkData = {
      id_product: this.state.detailProd.id_product,
      id_user: token,
    };

    if (!this.props.username) {
      alert("please login");
    } else {
      Axios.post(`${BASE_URL}/transaction/checkCart`, checkData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.data.message === "cart_empty") {
            this.addToCartHandler(cartData, "add");
          } else {
            let currentQty = res.data.data[0].quantity;
            let updateStock = this.state.qty + currentQty;
            let cartUpdateData = {
              id_user: token,
              id_product: this.state.detailProd.id_product,
              currentQuantity: updateStock,
            };

            this.addToCartHandler(cartUpdateData, "update");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  addToCartHandler = (cartData, type) => {
    const token = localStorage.getItem("token");

    switch (type) {
      case "add":
        Axios.post(`${BASE_URL}/transaction/addToCart`, cartData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            this.setState({ isAdded: true });
            alert("Product added to cart");
          })
          .catch((err) => console.log(err));
        break;
      case "update":
        Axios.post(`${BASE_URL}/transaction/addToExistingCart`, cartData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            this.setState({ isAdded: true });
            alert("Product added to cart");
          })
          .catch((err) => console.log(err));
        break;

      default:
        break;
    }
  };

  render() {
    const { qty, detailProd, maxStock } = this.state;
    return (
      <Container>
        <div style={styles.productDetailWrapper}>
          <NavigationBar />
          <div style={{ display: "flex", marginLeft: "1%", marginRight: "1%" }}>
            <div style={styles.contImg}>
              <Image
                className="d-block"
                src={
                  detailProd
                    ? `http://localhost:2000/products/${detailProd.productimg}`
                    : ""
                }
                fluid
              ></Image>
            </div>
            <div style={styles.contDesc} className="pl-5">
              <h1
                style={{
                  border: "5px solid gray",
                  borderRadius: "10px",
                  padding: "1%",
                }}
              >
                {detailProd ? detailProd.product_name : ""}
              </h1>
              <p>
                <strong>Category : </strong>
                {detailProd ? detailProd.category_name : ""}
              </p>
              <p>
                <strong>Description : </strong>
                {detailProd ? detailProd.product_description : ""}
              </p>
              <p>
                <strong>Price : </strong>
                {detailProd
                  ? detailProd.product_price.toLocaleString("id", {
                      style: "currency",
                      currency: "IDR",
                    })
                  : ""}{" "}
                /item
              </p>
              <p>
                <strong>Stock : </strong>
                {detailProd ? detailProd.TotalStockAvail : ""}
              </p>

              <div className="productActionBtn" style={styles.productActionBtn}>
                <Button
                  variant="light"
                  style={styles.productQtyBtn}
                  disabled={qty === 1 ? true : false}
                  onClick={this.onMinus}
                >
                  -
                </Button>
                <Form.Control
                  type="text"
                  style={styles.productQty}
                  value={qty}
                  onChange={(e) => this.onChangeQty(e)}
                />
                <Button
                  variant="light"
                  style={styles.productQtyBtn}
                  disabled={qty === maxStock ? true : false}
                  onClick={this.onPlus}
                >
                  +
                </Button>
                <Button
                  block
                  variant="primary"
                  style={styles.addToCartBtn}
                  onClick={this.onAddToCart}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

const styles = {
  productDetailWrapper: {
    backgroundColor: "#fff",
    backgroundImage: "linear-gradient(to bottom, #e7e2e5, #e5dfe5, #e2dce6, #dddae7, #d7d8e8, #d7daea, #d6dceb, #d6deed, #dde4f0, #e5eaf3, #ecf0f6, #f4f6f9)",
    marginBottom: "200px",
    marginTop: "100px",
    padding: "20px",
    border: "1px solid #F3F4F6",
    borderRadius: "4px",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  },

  contTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1%",
    height: "10vh",
    marginTop: "10px",
  },
  contImg: {
    // backgroundImage: "linear-gradient(to right, #fda085, #f6d365)",
    flexBasis: "25%",
    borderRadius: "10px",
  },
  contDesc: {
    flexBasis: "60%",
    padding: "0 1% 0 1%",
  },
  img: {
    height: "80%",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10%",
  },
  // action button
  productActionBtn: {
    display: "flex",
    bottom: "0",
    width: "100%",
    marginTop: "70px",
  },
  productQty: {
    width: "50px",
    margin: "0 7px",
    border: "1px solid #eaeaea",
  },
  productQtyBtn: {
    border: "1px solid #eaeaea",
    backgroundColor: "#fff",
    padding: "0 4px",
  },
  addToCartBtn: {
    fontSize: "14px",
    fontWeight: "500",
    marginLeft: "10px",
  },
};

const mapStateToProps = (state) => {
  return {
    username: state.userReducer.username,
  };
};

export default connect(mapStateToProps, { addToCart })(DetailPage);
