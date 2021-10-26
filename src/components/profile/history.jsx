import React from "react";
import { Card, ListGroup, Image } from "react-bootstrap";
import Axios from "axios";
import Info from "../Info";
const BASE_URL = "http://localhost:2000";
const Error =
  "https://firebasestorage.googleapis.com/v0/b/e-commerce-f95d6.appspot.com/o/info%2Ferror.png?alt=media&token=cb31b07e-6bc7-4fb8-aa56-41ac6a50bb0c";
export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historyData: [],
    };
  }
  componentDidMount() {
    this.getTransactionHistory();
  }

  getTransactionHistory() {
    let token = localStorage.getItem("token");
    let getCartData = {
      id_user: token,
    };
    Axios.post(`${BASE_URL}/transaction/getHistory`, getCartData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        this.setState({ historyData: res.data });
      })
      .catch((err) => console.log(err));
  }

  fetchCartData = () => {
    return this.state.historyData.map((item, index) => {
      return <tbody></tbody>;
    });
  };

  render() {
    return (
      <Card className="border-0">
        <Card.Header className="bg-white border-0 p-2">
          <span style={style.cardHeading}>History</span>

          {this.state.historyData.length < 1 && <Info img={Error} />}
          <div>
            {this.state.historyData.map((item) => {
              return (
                <Card style={{ width: "100%" }} className="mt-3">
                  <Card.Header
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>{item.order_number}</span>
                    <span>Ordered at {item.order_date}</span>
                  </Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item style={style.infoWrapper}>
                      <Image
                        width={70}
                        height={70}
                        style={{ border: "1px solid #eaeaea" }}
                        src={`http://localhost:2000/products/${item.productimg}`}
                      />
                      <div className="mx-2 my-1">
                        <p style={style.productinfo}>{item.product_name}</p>
                        <p style={style.productinfo}>x {item.quantity}</p>
                        <p style={style.productinfo}>Rp. {item.total_price}</p>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              );
            })}
          </div>
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
  infoWrapper: {
    display: "flex",
  },
  productinfo: {
    margin: 0,
    fontSize: "12px",
  },
};
