import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Card,
  Button,
  Col,
  Image,
  Form,
} from "react-bootstrap";
import Axios from "axios";
import NavigationBar from "../../components/NavigationBar";
import utils from "../../assets/styles/utils.module.css";

import firebase from "../../firebase";

const BASE_URL = "https://api-warehouse-3.purwadhikafs2.com";
const mandiri =
  "https://firebasestorage.googleapis.com/v0/b/e-commerce-f95d6.appspot.com/o/paymethods%2Fmandiri.png?alt=media&token=cb738bd8-e547-4737-9c41-ca99dca3df1f";
const bsi =
  "https://firebasestorage.googleapis.com/v0/b/e-commerce-f95d6.appspot.com/o/paymethods%2FBank_Syariah_Indonesia.svg.png?alt=media&token=35372c22-fe15-42b3-a83b-f659a845870c";
const bni =
  "https://firebasestorage.googleapis.com/v0/b/e-commerce-f95d6.appspot.com/o/paymethods%2F1200px-BNI_logo.svg.png?alt=media&token=e4791da1-312c-458a-a39b-e2508ccd95af";

export default class PaymentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payment_method: "manual transfer",
      showUploadArea: false,
      image: null,
      isProgress: false,
      progress: 0,
      imageURL: null,
      isUpdated: false,
      isPaymentProcessed: false,
      paymentMethod: null,
    };
  }

  componentDidMount() {
    this.getPayment();
  }

  handleChange = (e) => {
    if (e.target.files[0]) {
      this.setState({ image: e.target.files[0] });
    }
  };

  handleUpload = () => {
    if (!this.state.image) {
      alert("Pilih bukt pembayaran");
      return false;
    }

    let order_number = this.props.match.params.payToken;
    let file = this.state.image;
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var uploadTask = storageRef.child("payments/" + order_number).put(file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        this.setState({ isProgress: true });
        var progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({ progress });
      },
      (error) => {
        throw error;
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          this.setState({
            isProgress: false,
            imageURL: url,
          });

          if (!this.state.isProgress) {
            this.updatePayment();
          }
        });
        document.getElementById("file").value = null;
      }
    );
  };

  updatePayment = () => {
    let paymentData = {
      order_number: this.props.match.params.payToken,
      payment_image: this.state.imageURL,
      nominal: this.refs.nominal.value,
      nama: this.refs.nama.value,
    };
    Axios.post(`${BASE_URL}/transaction/uploadPayment`, paymentData)
      .then((res) => {
        if (res.data.message === "update_success") {
          this.setState({ isUpdated: true });
        }
      })
      .catch((err) => console.log(err));
  };

  getPayment = () => {
    let order_number = this.props.match.params.payToken;
    Axios.post(`${BASE_URL}/transaction/getPaymentStatus`, {
      order_number: order_number,
    })
      .then((res) => {
        console.log(res);
        if (res) {
          this.setState({ paymentMethod: res.data[0].payment_method });

          if (res.data[0].status === "processed") {
            this.setState({ isPaymentProcessed: true });
          } else {
            this.setState({ isPaymentProcessed: false });
          }
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <NavigationBar />
        <Container>
          <Row
            className="d-flex align-center justify-content-center "
            style={{ marginTop: "80px" }}
          >
            <Col sm={6}>
              <Card>
                <Card.Header
                  className="bg-white p-3"
                  style={style.cardPayHeader}
                >
                  <span>
                    <strong> {this.state.paymentMethod} </strong>
                  </span>
                  {this.state.paymentMethod ===
                    "Manual Transfer - Bank Syariah Indonesia" && (
                    <Image src={bsi} width="70"></Image>
                  )}
                  {this.state.paymentMethod ===
                    "Manual Transfer - Bank Nasional Indonesia" && (
                    <Image src={bni} width="70"></Image>
                  )}
                  {this.state.paymentMethod ===
                    "Manual Transfer - Bank Mandiri" && (
                    <Image src={mandiri} width="70"></Image>
                  )}
                </Card.Header>

                {this.state.isPaymentProcessed && (
                  <div className="notif p-3">
                    <div
                      className="w-100 d-flex align-items-center"
                      style={{
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <i
                        className="fas fa-check-circle text-success"
                        style={{ fontSize: "24px" }}
                      ></i>
                      <strong
                        className="text-success text-bold"
                        style={{ fontSize: "20px" }}
                      >
                        Payment Processed
                      </strong>
                      <small className="text-muted">
                        Please check your order update
                      </small>
                      <Button
                        className="my-3"
                        as={Link}
                        to="/profile/transaction"
                        style={style.myHalfButton}
                      >
                        Back to transaction
                      </Button>
                    </div>
                  </div>
                )}

                {this.state.isUpdated && (
                  <div className="notif p-3">
                    <div
                      className="w-100 d-flex align-items-center"
                      style={{
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <i
                        className="fas fa-check-circle text-success"
                        style={{ fontSize: "24px" }}
                      ></i>
                      <strong
                        className="text-success text-bold"
                        style={{ fontSize: "20px" }}
                      >
                        Payment Processed
                      </strong>
                      <small className="text-muted">
                        Please check your order update
                      </small>
                      <Button
                        className="my-3"
                        as={Link}
                        to="/profile/transaction"
                        style={style.myHalfButton}
                      >
                        Back to transaction
                      </Button>
                    </div>
                  </div>
                )}

                {!this.state.isPaymentProcessed && (
                  <div className="main">
                    <Card.Body>
                      <tr>
                        <td style={{ width: "100%" }}>
                          <label style={style.label} className=" text-muted">
                            Nomor Rekening
                          </label>
                          <br />
                          <strong>123980182</strong>
                        </td>
                        <td>
                          <Button
                            variant="secondary"
                            className="d-flex p-0 bg-white border-0 text-primary"
                          >
                            <i className="far fa-copy"></i>{" "}
                            <span
                              style={{ marginTop: "-3px", marginLeft: "5px" }}
                            >
                              <small>Salin</small>
                            </span>
                          </Button>
                        </td>
                      </tr>
                      <div style={{ marginTop: "10px" }}></div>

                      <tr style={{ marginTop: "320px" }}>
                        <td style={{ width: "100%" }}>
                          <label style={style.label} className=" text-muted">
                            Total pembayaran
                          </label>
                          <br />
                          <strong>
                            Rp{" "}
                            {parseInt(
                              localStorage.getItem("grandtotal")
                            ).toLocaleString()}
                          </strong>
                        </td>
                        <td></td>
                      </tr>
                    </Card.Body>

                    {this.state.showUploadArea && (
                      <Card.Footer className="bg-white">
                        <Form>
                          <Row className="mb-3 my-2">
                            <Form.Group as={Col} controlId="formGridEmail">
                              <Form.Label style={style.label}>
                                Nama pemilik rekening
                              </Form.Label>
                              <Form.Control
                                size="sm"
                                type="text"
                                ref="nama"
                                placeholder="Masukkan nama"
                              />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                              <Form.Label style={style.label}>
                                Nominal
                              </Form.Label>
                              <Form.Control
                                ref="nominal"
                                size="sm"
                                type="text"
                                placeholder="Contoh 2.300.000"
                              />
                            </Form.Group>
                          </Row>

                          <Form.Group
                            className="mb-3"
                            controlId="formGridAddress1"
                          >
                            <Form.Label style={style.label}>
                              File bukti transfer
                            </Form.Label>
                            <div></div>
                            <div style={style.inputFile}>
                              <input
                                type="file"
                                id="file"
                                className={utils.customFileInput}
                                onChange={this.handleChange}
                              />
                            </div>
                          </Form.Group>

                          <Button
                            className="w-100 my-2"
                            variant="default"
                            onClick={this.handleUpload}
                            style={style.uploadBtn}
                            disabled={this.state.isProgress}
                          >
                            {this.state.isProgress ? "Uploading" : "Upload"}
                          </Button>
                        </Form>
                      </Card.Footer>
                    )}
                  </div>
                )}
              </Card>

              {!this.state.isPaymentProcessed && (
                <div className=" my-4" style={style.buttonWrapper}>
                  <Button
                    className="w-100"
                    as={Link}
                    to="/profile/transaction"
                    style={style.myOutlineButton}
                  >
                    Kembali ke transaksi
                  </Button>
                  <Button
                    className="w-100"
                    style={style.myButton}
                    onClick={() => {
                      this.setState({ showUploadArea: true });
                    }}
                  >
                    Upload bukti pembayaran
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const style = {
  label: {
    fontSize: "13px",
    fontWeight: "normal",
  },
  cardPayHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonWrapper: {
    display: "flex",
    gap: "10px",
  },
  myOutlineButton: {
    width: "100%",
    border: "1px solid #3554D1",
    padding: "8px",
    fontWeight: "bold",
    backgroundColor: "#fff",
    color: "#3554D1",
    borderRadius: "6px",
    fontSize: "14px",
  },
  myButton: {
    width: "100%",
    border: "none",
    padding: "8px",
    fontWeight: "500",
    backgroundColor: "#3554D1",
    borderRadius: "6px",
    fontSize: "14px",
  },
  myHalfButton: {
    width: "50%",
    border: "none",
    padding: "8px",
    fontWeight: "500",
    backgroundColor: "#3554D1",
    borderRadius: "6px",
    fontSize: "14px",
  },

  inputFile: {
    width: "100%",
    height: "100px",
    border: "2px dashed #eaeaea",
    borderRadius: "3px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadBtn: {
    backgroundColor: "#eaeaea",
    fontWeight: "500",
  },
};
