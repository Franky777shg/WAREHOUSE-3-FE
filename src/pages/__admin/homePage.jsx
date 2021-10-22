import React from "react";
import { Button, Container, Tabs, Tab, Dropdown, Table, Modal } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";
import { Bar } from "react-chartjs-2";

import { connect } from "react-redux";
import { keepAdminLogin } from "../../redux/actions";

import NavigationBar from "../../components/__admin/NavigationBar";

const BASE_URL = "http://localhost:2000";

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: [],
      productName: [],
      productQty: [],
      desc: "",
      startDate: "",
      endDate: "",
      key: "home",
      modalInputSales: []
    }
  }

  componentDidMount() {
    this.fetchDataSales()
  }

  fetchDataSales = () => {
    Axios.get(`${BASE_URL}/prod-admin/product-report`)
      .then((res) => {
        // console.log("ProdThisMonth", res.data)
        this.setState({
          product: res.data[0],
          productName: res.data[1],
          productQty: res.data[2],
          desc: res.data[3]
        })
      })
      .catch((err) => console.log(err))
  }

  onFilterDate = () => {
    let obj = {
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }
    // console.log("obj", obj)
    Axios.post(`${BASE_URL}/prod-admin/product-sales-report`, obj)
      .then((res) => {
        // console.log("filter date result", res.data)
        this.setState({
          product: res.data[0],
          productName: res.data[1],
          productQty: res.data[2],
          desc: res.data[3]
        })
      })
      .catch((err) => {
        // console.log("err",err.response.data)
        this.setState({ modalInputSales: err.response.data })
      })
  }

  render() {
    // console.log("state", this.state)
    console.log("err", this.state.modal)
    if (localStorage.getItem("admin_token")) {
      this.props.keepAdminLogin();
    }
    if (!this.props.adminUsername) {
      return <Redirect to="/auth/admin/login" />;
    }
    return (
      <div>
        <div >
          <NavigationBar />
          <div style={{ backgroundColor: 'orange' }}>Sales</div>
          <Container >
            <Tabs activeKey={this.state.key} onSelect={(x) => this.setState({ key: x })}
              id="uncontrolled-tab-example"
              className="mb-3">
              <Tab eventKey="home" title="Sales Report">
                <div className="d-flex justify-content-end mb-2">
                  <h3 style={{marginRight: '3%'}}>{this.state.desc}</h3>
                  <input type="date"
                  style={{marginRight: '1%'}}
                    ref="date1"
                    onChange={(x) => this.setState({ startDate: x.target.value })}
                  />
                  <input type="date"
                  style={{marginRight: '1%', marginLeft:'1%'}}
                    ref="date2"
                    onChange={(x) => this.setState({ endDate: x.target.value })}
                  />
                  <Button variant="outline-success"
                    onClick={this.onFilterDate}
                    style={{marginRight: '1%'}}
                  >Search
                  </Button>
                  <Dropdown >
                    <Button variant="success" disabled>Sort By</Button>

                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" disabled />

                    <Dropdown.Menu variant="dark">
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <Table striped bordered hover variant="dark" responsive>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Product Name</th>
                      <th>Product Price (/set)</th>
                      <th>Quantity Sold</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.product.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.product_name}</td>
                          <td>{item.product_price.toLocaleString('id', { style: 'currency', currency: 'IDR' })}</td>
                          <td>{item.QtySold}</td>
                          <td>{item.TotalShop.toLocaleString('id', { style: 'currency', currency: 'IDR' })}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Tab>
              {/* <Bar/> */}
              <Tab eventKey="profile" title="Revenue Report">

              </Tab>
            </Tabs>
          </Container>
        </div>

        <Modal show={this.state.modalInputSales[0]}
        backdrop="static"
        keyboard={false}
        centered>
            <Modal.Header>
              <Modal.Title>Error!</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.modalInputSales[1]}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => this.setState({ modalInputSales: [false, ""] })}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adminUsername: state.adminReducer.adminUsername,
  };
};

export default connect(mapStateToProps, { keepAdminLogin })(HomePage);
