import React from "react";
import Axios from "axios";
import NavigationBar from "../NavigationBar";

import { Link, Switch, Route } from "react-router-dom";

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
import firebase from "../../firebase";
import Skeleton from "react-loading-skeleton";
const URL_API = "https://api-warehouse-3.purwadhikafs2.com/user";

class Setting extends React.Component {
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
      isEdit: true,
      image: null,
      username: "",
      isProgress: null,
      imageURL: "",
      isProfileImageUpdated: false,
      isLoading: true,
      defaultDP:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-f95d6.appspot.com/o/paymethods%2Fdefault.png?alt=media&token=3ad4d2fd-014d-420a-af47-e80dee317593",
    };
  }
  componentDidMount() {
    this.fectDataUser();
    this.fectDataAddress();
  }

  fectDataAddress = () => {
    let token = localStorage.getItem("token");
    this.setState({ isLoading: true });
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
        this.setState({ dataaddress: res.data, isLoading: false });
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
        this.setState({ datauser: res.data });
        this.setState({ images: res.data[0].profile_picture });
        this.setState({ username: res.data[0].username });
      })
      .catch((err) => {
        console.log(err);
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

  handleChange = (e) => {
    if (e.target.files[0]) {
      this.setState({ image: e.target.files[0] });
    }
  };

  handleUpload = () => {
    if (!this.state.image) {
      alert("Pilih foto anda");
      return false;
    }

    let username = this.state.username;
    let file = this.state.image;
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var uploadTask = storageRef
      .child("userprofile/" + "USER-" + username)
      .put(file);

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
            this.updateProfile();
          }
        });
        document.getElementById("file").value = null;
      }
    );
  };

  updateProfile() {
    let token = localStorage.getItem("token");
    let userData = {
      profile_image: this.state.imageURL,
    };

    Axios.post(`${URL_API}/upload-pic/`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data.message === "update_success") {
          this.setState({ isProfileImageUpdated: true });
        }
      })
      .catch((err) => console.log(err));
  }

  removeProfileImage() {
    let token = localStorage.getItem("token");
    let userData = {
      profile_image: "123123.png",
    };

    Axios.post(`${URL_API}/delete-pic/`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        this.setState({ dataUser: res.data });
        this.setState({ images: res.data[0].profile_picture });
      })
      .catch((err) => {
        console.log("error get", err);
      });
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
    this.setState({ isLoading: true });
    Axios.post(`${URL_API}/update-user/`, dataUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        this.setState({ datauser: res.data });
        this.setState({
          successUpdate: SVGComponentTransferFunctionElement,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ warningvisible: true });
        this.setState({ warning: err.response.data });
      });
  };

  render() {
    const { successUpdate, warningvisible, warning, images } = this.state;
    return (
      <div>
        <NavigationBar />
        <Container>
          <Row style={styles.cont}>
            <Col sm={9}>
              <div style={styles.dataProfile}>
                {this.state.datauser.map((item) => {
                  return (
                    <div>
                      {successUpdate ? (
                        <Alert variant="success">Data Berhasil Disimpan</Alert>
                      ) : null}
                      {warningvisible ? (
                        <Alert variant="danger">{warning}</Alert>
                      ) : null}

                      <Row>
                        <Form.Group as={Col} className="mb-2">
                          <Form.Label className="myLabel">Username</Form.Label>
                          <Form.Control
                            ref="usernameEdit"
                            type="text"
                            defaultValue={item.username}
                            placeholder="Enter Username"
                            disabled={this.state.isEdit}
                          />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-2">
                          <Form.Label className="myLabel">Full Name</Form.Label>
                          <Form.Control
                            ref="fullnameEdit"
                            type="text"
                            defaultValue={item.full_name}
                            placeholder="Enter Fullname"
                            disabled={this.state.isEdit}
                          />
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group as={Col} className="mb-2">
                          <Form.Label className="myLabel">Email</Form.Label>
                          <Form.Control
                            ref="emailEdit"
                            type="text"
                            defaultValue={item.email}
                            placeholder="Enter Email"
                            disabled={this.state.isEdit}
                          />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-2">
                          <Form.Label className="myLabel">Gender</Form.Label>
                          {/* <Form.Control ref="genderEdit" type="text" defaultValue={item.gender} placeholder="Enter Gender" /> */}
                          <Form.Select
                            ref="genderEdit"
                            type="text"
                            defaultValue={item.gender}
                            size="md"
                            disabled={this.state.isEdit}
                          >
                            <option>Laki</option>
                            <option>Perempuan</option>
                          </Form.Select>
                        </Form.Group>
                      </Row>

                      <Form.Group className="mb-2">
                        <Form.Label className="myLabel">Age</Form.Label>
                        <Form.Control
                          ref="ageEdit"
                          type="number"
                          defaultValue={item.age}
                          placeholder="Enter Age"
                          disabled={this.state.isEdit}
                        />
                      </Form.Group>
                      <Button className="mt-4" onClick={this.onUpdateUser}>
                        Update data
                      </Button>
                      <Button
                        className="mt-4 mx-2"
                        onClick={() => {
                          this.setState({ isEdit: false });
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Col>
            <Col sm={3} className="my-3">
              {this.state.datauser.map((item) => {
                return (
                  <div style={styles.imgProfile}>
                    <div style={{ width: "100%", height: "150px" }}>
                      {this.state.isLoading ? (
                        <Skeleton height={150} />
                      ) : (
                        <Image
                          rounded
                          src={
                            this.state.isProfileImageUpdated
                              ? this.state.imageURL
                              : item.profile_picture
                          }
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        ></Image>
                      )}
                    </div>

                    <div style={{ marginTop: "1vh" }}>
                      <form>
                        <input
                          type="file"
                          id="file"
                          onChange={this.handleChange}
                        />
                      </form>
                      <div style={styles.uploadButton} className="mt-4">
                        <Button
                          variant="light"
                          style={styles.myOutlineButton}
                          onClick={this.handleUpload}
                          disabled={this.state.isProgress}
                        >
                          Upload <i className="fas fa-camera"></i>
                        </Button>
                        <Button
                          variant="light"
                          style={styles.myOutlineButton}
                          className="mx-2"
                          onClick={this.removeProfileImage}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Setting;

const styles = {
  profileCard: {
    border: "none",
    border: "1px solid #F3F4F6",
    borderRadius: "8px",
    boxShadow: "0 1px 3px 0px rgba(0, 0, 0, 0.05)",
  },
  noBorder: {
    border: "none",
    borderRadius: "5px",
  },
  imgProfile: {
    // border : '1px solid black',
    // borderRadius: '2%',
  },
  uploadButton: {
    // marginTop: "2vh",
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
  },
  dataProfile: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  changePass: {
    display: "flex",
    flexDirection: "row",
  },

  myOutlineButton: {
    backgroundColor: "#fff",
    fontWeight: "500",
    border: "1px solid #eaeaea",
    color: "#525252",
  },
};
