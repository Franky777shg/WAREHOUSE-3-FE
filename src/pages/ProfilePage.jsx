import React from "react";
import Axios from "axios";
import NavigationBar from "../components/NavigationBar";
import Profile from "../components/profile/profile";
import Transaction from "../components/profile/transaction";
import History from "../components/profile/history";
import Setting from "../components/profile/setting";

import { Link, Switch, Route } from "react-router-dom";

import utils from "../assets/styles/utils.module.css";

import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Tab,
  Tabs,
  Table,
  Alert,
  Image,
  ListGroup,
  Card,
} from "react-bootstrap";

const URL_API = "http://localhost:2000/user";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datauser: [],
      dataaddress: [],
      successUpdate: false,
      warning: null,
      warningvisible: false,
      idEdit: null,
      images: "",
      activeTab: "",
    };
  }

  fectDataAddress = () => {
    let token = localStorage.getItem("token");
    Axios.post(
      `${URL_API}/get-useraddress/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        this.setState({ dataaddress: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fectDataUser = () => {
    let token = localStorage.getItem("token");
    Axios.post(
      `${URL_API}/get-user/`,
      {},
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        console.log(res.data);
        this.setState({ datauser: res.data });
        this.setState({ images: res.data[0].profile_picture });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.fectDataUser();
    this.fectDataAddress();
    console.log();
    // this.getUserProfile()
  }

  onUpdateUser = () => {
    const usernameEdit = this.refs.usernameEdit.value;
    const fullnameEdit = this.refs.fullnameEdit.value;
    const emailEdit = this.refs.emailEdit.value;
    const genderEdit = this.refs.genderEdit.value;
    const ageEdit = +this.refs.ageEdit.value;

    const dataUser = {
      username: usernameEdit,
      full_name: fullnameEdit,
      email: emailEdit,
      gender: genderEdit,
      age: ageEdit,
    };
    let token = localStorage.getItem("token");
    Axios.post(`${URL_API}/update-user/`, dataUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        this.setState({ datauser: res.data });
        this.setState({ successUpdate: true });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ warningvisible: true });
        this.setState({ warning: err.response.data });
      });
  };

  onAddAddress = () => {
    const addressadd = this.refs.addressadd.value;
    const kecamatanadd = this.refs.kecamatanadd.value;
    const kabupatenadd = this.refs.kabupatenadd.value;
    const status_aktifadd = this.refs.status_aktifadd.value;

    const addressInput = {
      address: addressadd,
      kecamatan: kecamatanadd,
      kabupaten: kabupatenadd,
      status_aktif: status_aktifadd,
    };
    console.log(addressInput);

    let token = localStorage.getItem("token");
    Axios.post(`${URL_API}/get-add-user-address/`, addressInput, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        this.setState({ dataaddress: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onEditAddress = (id) => {
    const addressEdit = this.refs.addressEdit.value;
    const kecamatanEdit = this.refs.kecamatanEdit.value;
    const kabupatenEdit = this.refs.kabupatenEdit.value;
    const status_aktifadd = this.refs.status_aktifadd.value;

    const editAddress = {
      address: addressEdit,
      kecamatan: kecamatanEdit,
      kabupaten: kabupatenEdit,
      status_aktif: status_aktifadd,
    };
    console.log(editAddress);

    let token = localStorage.getItem("token");
    Axios.post(`${URL_API}/get-update-user-address/`, editAddress, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        this.setState({ dataaddress: res.data, idEdit: null });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onDeleteAddress = (id) => {
    let token = localStorage.getItem("token");
    Axios.delete(
      `${URL_API}/get-delete-user-address/${id}`
      // {},
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
    )
      .then((res) => {
        this.setState({ dataaddress: res.data });
        this.fectDataAddress();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChoose = (e) => {
    console.log("e.target.files", e.target.files);
    this.setState({ images: e.target.files[0] });
  };

  handleUpload = () => {
    const data = new FormData();
    console.log(data);
    data.append("IMG", this.state.images);
    console.log(data.get("IMG"));

    let token = localStorage.getItem("token");
    Axios.post(`${URL_API}/upload-pic/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        this.setState({ images: res.data });
        console.log(res.data);
        this.fectDataUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deletePic = () => {
    let token = localStorage.getItem("token");
    Axios.post(
      `${URL_API}/delete-pic/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        // console.log("dataget", res.data[0].profile_picture)
        this.setState({ dataUser: res.data });
        this.setState({ images: res.data[0].profile_picture });
      })
      .catch((err) => {
        console.log("error get", err);
      });
  };
  renderTInput = () => {
    return (
      <tfoot>
        <tr>
          <td>
            <Form.Control
              ref="addressadd"
              type="text"
              placeholder="Enter Address "
            />
          </td>
          <td>
            <Form.Control
              ref="kecamatanadd"
              type="text"
              placeholder="Enter Kecamatan "
            />
          </td>
          <td>
            <Form.Control
              ref="kabupatenadd"
              type="text"
              placeholder="Enter Kabupaten "
            />
          </td>
          {/* <td><Form.Control ref="status_aktifadd" type="text" placeholder="Enter Status " /></td> */}
          <td>
            <Form.Select
              ref="status_aktifadd"
              type="text"
              size="md"
              placeholder="Choose"
            >
              <option>Aktif</option>
              <option>Tidak Aktif</option>
            </Form.Select>
          </td>
          <td>
            <Button variant="outline-success" onClick={this.onAddAddress}>
              Add
            </Button>
          </td>
        </tr>
      </tfoot>
    );
  };
  render() {
    const { successUpdate, warningvisible, warning, images } = this.state;
    return (
      <div>
        <NavigationBar />
        <Container>
          <Row style={{ paddingTop: "80px" }}>
            <Col sm={3}>
              <Card className="p-2" style={styles.profileCard}>
                <ListGroup>
                  <ListGroup.Item
                    className={utils.leftMenu}
                    style={styles.noBorder}
                    as={Link}
                    to="/profile/"
                  >
                    <i className="fas fa-id-badge"></i>
                    <span style={{ marginLeft: "10px" }}>Profile</span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    className={utils.leftMenu}
                    style={styles.noBorder}
                    as={Link}
                    to="/profile/transaction"
                  >
                    <i className="fas fa-shopping-bag"></i>{" "}
                    <span style={{ marginLeft: "10px" }}>Transaction</span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    className={utils.leftMenu}
                    style={styles.noBorder}
                    as={Link}
                    to="/profile/history"
                  >
                    <i className="fas fa-history"></i>
                    <span style={{ marginLeft: "10px" }}>Order History</span>
                  </ListGroup.Item>

                  <ListGroup.Item
                    className={utils.leftMenu}
                    style={styles.noBorder}
                    as={Link}
                    to="/profile/setting"
                  >
                    <i className="fas fa-cog"></i>
                    <span style={{ marginLeft: "10px" }}>Settings</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col sm={9}>
              <Card className="p-2" style={styles.profileCard}>
                <Switch>
                  <Route exact path="/profile/">
                    <Profile />
                  </Route>
                  <Route path="/profile/transaction">
                    <Transaction />
                  </Route>
                  <Route path="/profile/history">
                    <History />
                  </Route>
                  <Route path="/profile/setting">
                    <Setting />
                  </Route>
                </Switch>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ProfilePage;

const styles = {
  profileCard: {
    border: "none",
    border: "1px solid #F3F4F6",
    borderRadius: "5px",
    boxShadow: "0 1px 2px 0px rgba(0, 0, 0, 0.05)",
  },
  noBorder: {
    border: "none",
    borderRadius: "5px",
  },
  cont: {
    margin: "10vh -2vh",
  },
  imgProfile: {
    // border : '1px solid black',
    // borderRadius: '2%',
  },
  uploadButton: {
    marginTop: "2vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dataProfile: {
    border: "1px solid black",
    borderRadius: "2%",
    padding: "3vh",
  },
  changePass: {
    display: "flex",
    flexDirection: "row",
  },
};
