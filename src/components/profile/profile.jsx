import React from "react";
import {
  Card,
  Image,
  Alert,
  Button,
  Modal,
  Row,
  Form,
  Col,
} from "react-bootstrap";
import Axios from "axios";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const URL_API = "http://localhost:2000/user";

export default class Profile extends React.Component {
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
      isAddAddress: false,
      isLoading: false,
      editAddressModal: false
    };
  }

  componentDidMount() {
    this.fectDataAddress();
    this.fectDataUser();
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
        console.log(res.data);
        this.setState({ dataaddress: res.data });
        console.log(this.state.dataaddress)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fectDataUser = () => {
    let token = localStorage.getItem("token");
    this.setState({ isLoading: true });
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
        this.setState({ datauser: res.data, isLoading: false });
        this.setState({ images: res.data[0].profile_picture });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleAddAddress = () => {
    this.setState({ isAddAddress: true });
  };

  onAddAddress = () => {
    let addressData = {
      address: this.refs.alamat.value,
      kecamatan: this.refs.kecamatan.value,
      kabupaten: this.refs.kabupaten.value,
      provinsi: this.refs.provinsi.value,
      hp: this.refs.hp.value,
      penerima: this.refs.penerima.value,
      tipe_alamat: "",
      jenis_alamat: "",
    };

    let token = localStorage.getItem("token");
    Axios.post(`${URL_API}/get-add-user-address/`, addressData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        this.setState({ dataaddress: res.data });
        this.setState({ isAddAddress: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onEditAddress = () => {
    let editaddressData = {
      idaddress: this.state.idEdit,
      address: this.refs.alamat.value,
      kecamatan: this.refs.kecamatan.value,
      kabupaten: this.refs.kabupaten.value,
      provinsi: this.refs.provinsi.value,
      hp: this.refs.hp.value,
      penerima: this.refs.penerima.value,
      tipe_alamat: this.refs.jenis_alamat.value,
    };
    
    console.log(editaddressData);

    let token = localStorage.getItem("token");
    Axios.post(`${URL_API}/get-update-user-address/`, editaddressData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        this.setState({ dataaddress: res.data});
        this.setState({ editAddressModal: false });

      })
      .catch((err) => {
        console.log(err);
      });
  };


  handleCloseAdd = () => {
    this.setState({ isAddAddress: false });
  };

  handleCloseEdit = () => {
    this.setState({ editAddressModal: false });
  };

  render() {
    console.log(this.state.idEdit)
    return (
      <div>
        <Card className="border-0">
          <Card.Header className="bg-white border-0 p-2">
            <span style={style.cardHeading}>Profile</span>
          </Card.Header>
          <div className="profile m-2">
            {this.state.datauser.map((item) => {
              return (
                <Alert
                  style={style.profileWrapper}
                  className="p-2 bg-white text-secondary"
                >
                  {this.state.isLoading ? (
                    <Skeleton height={45} width={50} />
                  ) : (
                    <Image src={item.profile_picture} width="50" rounded />
                  )}

                  <div className="mx-2" style={{ marginTop: "5px" }}>
                    <h1
                      style={{
                        margin: "0px",
                        fontSize: "18px",
                        color: "#525252",
                      }}
                    >
                      <strong>{item.full_name}</strong>
                    </h1>
                    <p style={{ margin: "0px", fontSize: "14px" }}>
                      Email : {item.email}
                    </p>
                  </div>
                </Alert>
              );
            })}
            <label className="myLabel"> Delivery addresses </label>{" "}
            <div style={style.addressWrapper} className="mt-2">
              {this.state.dataaddress.map((item) => {
                return (
                  <Alert 
                    onClick={() => this.setState({ editAddressModal: true , idEdit : item.id_address})}
                    style={style.addressItem}
                    className="p-2 bg-white text-secondary"
                  >
                    <i
                      className="fas fa-map-marker-alt"
                      style={{ fontSize: "20px" }}
                    ></i>
                    <div className="mx-2" style={{ marginTop: "5px" }}>
                      <h1 style={{ margin: "0px", fontSize: "16px" }}>
                        {item.package_recipient}
                      </h1>
                      <p style={{ margin: "0px", fontSize: "12px" }}>
                        {item.kabupaten}, {item.provinsi}
                      </p>
                    </div>
                  </Alert>
                );
              })}
            </div>
            <Button size="sm" onClick={this.handleAddAddress}>
              <i className="fas fa-plus"></i> Add new address
            </Button>
          </div>
        </Card>

        {/* Add address modal */}
        <Modal show={this.state.isAddAddress} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-2">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="myLabel">Nama penerima</Form.Label>
                <Form.Control size="sm" type="text" ref="penerima" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label className="myLabel">HP penerima</Form.Label>
                <Form.Control size="sm" type="text" ref="hp" />
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="myLabel">Jenis alamat</Form.Label>
                <Form.Select ref="jenis_alamat" defaultValue="Choose...">
                  <option value="Rumah">Rumah</option>
                  <option value="Kantor">Kantor</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="myLabel">Provinsi</Form.Label>
                <Form.Control size="sm" type="text" ref="provinsi" />
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="myLabel">Kecamatan</Form.Label>
                <Form.Control size="sm" type="text" ref="kecamatan" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label className="myLabel">Kabupaten</Form.Label>
                <Form.Control size="sm" type="text" ref="kabupaten" />
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group>
                <Form.Label className="myLabel">Alamat lengkap</Form.Label>
                <Form.Control size="sm" type="text" ref="alamat" />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer className="py-1">
            <Button variant="secondary" onClick={this.handleCloseAdd}>
              Batal
            </Button>
            <Button variant="primary" onClick={this.onAddAddress}>
              Tambah alamat
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit address modal */}
        <Modal show={this.state.editAddressModal} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add Address</Modal.Title>
          </Modal.Header>
          {this.state.dataaddress.map((item) => {
          if(this.state.idEdit === item.id_address){
              return(    
          <Modal.Body>
            <Row className="mb-2">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="myLabel">Nama penerima</Form.Label>
                <Form.Control size="sm" type="text" ref="penerima" defaultValue={item.package_recipient} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label className="myLabel">HP penerima</Form.Label>
                <Form.Control size="sm" type="text" ref="hp" defaultValue={item.address_phone} />
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="myLabel">Jenis alamat</Form.Label>
                <Form.Select ref="jenis_alamat" defaultValue={item.address_type}>
                  <option value="Rumah">Rumah</option>
                  <option value="Kantor">Kantor</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="myLabel">Provinsi</Form.Label>
                <Form.Control size="sm" type="text" ref="provinsi" defaultValue={item.provinsi} />
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="myLabel">Kecamatan</Form.Label>
                <Form.Control size="sm" type="text" ref="kecamatan" defaultValue={item.kecamatan} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label className="myLabel">Kabupaten</Form.Label>
                <Form.Control size="sm" type="text" ref="kabupaten" defaultValue={item.kabupaten}/>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group>
                <Form.Label className="myLabel">Alamat lengkap</Form.Label>
                <Form.Control size="sm" type="text" ref="alamat" defaultValue={item.address} />
              </Form.Group>
            </Row>
          </Modal.Body>
            )
          }
            
          
             
          })}
          <Modal.Footer className="py-1">
            <Button variant="secondary" onClick={this.handleCloseEdit}>
              Batal
            </Button>
            <Button variant="primary" onClick={this.onEditAddress}>
            Update            
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const style = {
  cardHeading: {
    fontWeight: "600",
    fontSize: "18px",
  },
  profileImage: {
    width: "auto",
    backgroundColor: "coral",
  },
  profileInfo: {
    width: "auto",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "coral",
    marginLeft: "10px",
  },
  profileWrapper: {
    display: "flex",
    flexDirection: "row",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    border: "1px solid #eaeaea",
  },
  addressItem: {
    display: "flex",
    flexDirection: "row",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    border: "1px solid #eaeaea",
    marginRight: "5px",
  },

  addressWrapper: {
    display: "flex",
  },

  btnOutline: {
    backgroundColor: "#fff",
    color: "#2962f6",
    border: "1px solid #5c91fb",
    fontWeight: "bold",
    borderRadius: "5px",
  },
};
