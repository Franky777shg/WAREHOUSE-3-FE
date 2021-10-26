import React from "react";
import { Button, Container, Tabs, Tab, Table, Modal, Card, Row, Col, Carousel, ListGroup } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";
import { Bar } from "react-chartjs-2";

import { connect } from "react-redux";
import { keepAdminLogin } from "../../redux/actions";

import NavigationBar from "../../components/__admin/NavigationBar";

const BASE_URL = "https://api-warehouse-3.purwadhikafs2.com";

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
      modalInputSales: [],
      prodRevenue: [],
      prodRevenueDesc: "",
      prodRevTotal: [],
      prodRevTotalDesc: "",
      prodRevDate: [],
      prodRevDateDesc: "",
      prodMostBuy: []
    }
  }

  componentDidMount() {
    this.fetchDataSales()
    this.fetchDataRevenue()
    this.fetchMostBuy()
  }

  fetchDataSales = () => { //this month
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

  fetchDataRevenue = () => {
    Axios.get(`${BASE_URL}/prod-admin/product-revenue`)
      .then((res) => {
        // console.log("rev this month", res.data)
        this.setState({
          prodRevenue: res.data[0],
          prodRevenueDesc: res.data[1]
        })
        Axios.get(`${BASE_URL}/prod-admin/product-revenue-total`)
          .then((res) => {
            // console.log("total", res.data)
            this.setState({
              prodRevTotal: res.data[0],
              prodRevTotalDesc: res.data[1]
            })
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  }

  fetchMostBuy = () => {
    Axios.get(`${BASE_URL}/prod-admin/product-most-buy`)
      .then((res) => {
        // console.log("mostbuy", res.data)
        this.setState({ prodMostBuy: res.data })
      })
      .catch((err) => console.log(err))
  }

  onFilterDate = () => {
    let obj = {
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }
    let objRev = {
      revDateStart: this.state.startDate,
      revDateEnd: this.state.endDate
    }
    console.log("obj", obj)
    console.log("obj2", objRev)
    Axios.post(`${BASE_URL}/prod-admin/product-sales-report`, obj)
      .then((res) => {
        // console.log("filter date result", res.data)
        this.setState({
          product: res.data[0],
          productName: res.data[1],
          productQty: res.data[2],
          desc: res.data[3]
        })
        Axios.post(`${BASE_URL}/prod-admin/product-revenue-date`, objRev)
          .then((res) => {
            // console.log("filter date rev", res.data)
            this.setState({
              prodRevDate: res.data[0],
              prodRevDateDesc: res.data[1]
            })
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => {
        // console.log("err",err.response.data)
        this.setState({ modalInputSales: err.response.data })
      })
  }

  render() {
    // console.log("state", this.state)
    // console.log("err", this.state.modal)
    // console.log("revtotal", this.state.prodRevTotal)
    // console.log("length", this.state.prodRevDate.length)
    // console.log("rev", this.state.prodRevDate)
    console.log("most-buy", this.state.prodMostBuy)

    const rand = () => Math.floor(Math.random() * 255)

    if (localStorage.getItem("admin_token")) {
      this.props.keepAdminLogin();
    }
    if (!this.props.adminUsername) {
      return <Redirect to="/auth/admin/login" />;
    }
    return (
      <div >
        <div >
          <NavigationBar />
          <div style={{ backgroundColor: 'orange' }} >
            Sales & Revenue Report
            <div className="d-flex justify-content-end mb-2">
              <h4 style={{ marginRight: '35%' }}> {this.state.desc}</h4>
              <input className="mb-2"
                type="date"
                style={{ marginRight: '1%' }}
                ref="date1"
                onChange={(x) => this.setState({ startDate: x.target.value })}
              />
              <i class="fas fa-arrows-alt-h fa-2x" style={{ marginTop: '0.1%' }}></i>
              <input className="mb-2"
                type="date"
                style={{ marginRight: '1%', marginLeft: '1%' }}
                ref="date2"
                onChange={(x) => this.setState({ endDate: x.target.value })}
              />
              <Button className="mb-2"
                variant="outline-success"
                onClick={this.onFilterDate}
                style={{ marginRight: '1%' }}
              >Search
              </Button>
            </div>
          </div>

          <Container style={{ backgroundColor: 'rgba(207, 201, 205, 0.87)' }}>

            <Tabs activeKey={this.state.key} onSelect={(x) => this.setState({ key: x })}
              id="uncontrolled-tab-example"
              className="mb-3">
              <Tab eventKey="home" title="Sales Report">

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
                <Bar
              data={{
                labels: this.state.productName,
                datasets:[
                  {
                    type: 'bar',
                    data: this.state.productQty,
                    backgroundColor: `rgba(${rand()}, ${rand()}, ${rand()},0.7)`,
                    label: `Product Sold ${this.state.desc}`,
                    borderColor: `rgba(${rand()}, ${rand()}, ${rand()},0.7)`,
                    hoverOffset: 4,
                  },
                  {
                    type: 'line',
                    data: this.state.productQty,
                    backgroundColor: `rgba(${rand()}, ${rand()}, ${rand()},0.5)`,
                    label: `Product Sold ${this.state.desc}`,
                    hoverOffset: 4,
                    fill: false,
                    borderColor: `rgba(${rand()}, ${rand()}, ${rand()})`
                  }
                ]
              }}
              options={{
                responsive:true,
                scales:{
                  xAxes: [{
                    ticks: {
                      autoSkip: false,
                      maxRotation: 90,
                      minRotation: 90,
                    }
                  }]
                }
              }}
              height={500}
              width={1000} className="mb-2"
              />
              </Tab>
              

              <Tab eventKey="profile" title="Revenue Report" >
                <Row xs={1} md={3} className="g-4" style={{ display: 'flex' }} >

                  <Col>
                    {this.state.prodRevTotal.map((item, index) => {
                      if (item.GrossRevenue === null && item.TotalQtySold === null) {
                        return (null)
                      }
                      return (
                        <Card className="mb-3" key={index}>
                          <Card.Body>
                            <Row>
                              <Col>
                                <i class="fas fa-coins fa-4x" style={{ color: 'rgba(255,215,0,0.6)' }}></i>
                              </Col>

                              <Col>
                                <Card.Title>Quantity Sold</Card.Title>
                                <Card.Text>
                                  {item.TotalQtySold} pcs
                                </Card.Text>
                              </Col>

                              <Col>
                                <Card.Title>Revenue</Card.Title>
                                <Card.Text>
                                  {item.GrossRevenue.toLocaleString('id', { style: 'currency', currency: 'IDR' })}
                                </Card.Text>
                              </Col>
                            </Row>
                          </Card.Body>

                          <Card.Footer>
                            <small className="text-muted">
                              <i class="far fa-calendar-alt" style={{ marginRight: '1%' }}></i>
                              {this.state.prodRevTotalDesc}
                            </small>
                          </Card.Footer>
                        </Card>
                      )
                    })}
                  </Col>

                  <Col>
                    {this.state.prodRevenue.map((item, index) => {
                      if (item.GrossRevenue === null && item.TotalQtySold === null) {
                        return (null)
                      }
                      return (
                        <Card className="mb-3" key={index}>
                          <Card.Body>
                            <Row>
                              <Col>
                                <i class="fas fa-money-bill-wave fa-4x" style={{ color: 'rgba(255,215,0,0.6)' }}></i>
                              </Col>

                              <Col>
                                <Card.Title>Quantity Sold</Card.Title>
                                <Card.Text>
                                  {item.TotalQtySold} pcs
                                </Card.Text>
                              </Col>

                              <Col>
                                <Card.Title>Revenue</Card.Title>
                                <Card.Text>
                                  {item.GrossRevenue.toLocaleString('id', { style: 'currency', currency: 'IDR' })}
                                </Card.Text>
                              </Col>
                            </Row>
                          </Card.Body>

                          <Card.Footer>
                            <small className="text-muted">
                              <i class="far fa-calendar-alt" style={{ marginRight: '1%' }}></i>
                              {this.state.prodRevenueDesc}
                            </small>
                          </Card.Footer>
                        </Card>
                      )
                    })}
                  </Col>

                  {this.state.prodRevDate.length === 0
                    ?
                    null
                    :
                    <Col>
                      {this.state.prodRevDate.map((item, index) => {
                        if (item.GrossRevenue === null && item.TotalQtySold === null) {
                          return (null)
                        }
                        return (
                          <Card className="mb-3" key={index} >
                            <Card.Body>
                              <Row>
                                <Col>
                                  <i class="fas fa-file-invoice-dollar fa-4x" style={{ color: 'rgba(255,215,0,0.6)' }}></i>
                                </Col>


                                <Col>
                                  <Card.Title>Quantity Sold</Card.Title>
                                  <Card.Text>
                                    {item.TotalQtySold} pcs
                                  </Card.Text>
                                </Col>

                                <Col>
                                  <Card.Title>Revenue</Card.Title>
                                  <Card.Text>
                                    {item.GrossRevenue.toLocaleString('id', { style: 'currency', currency: 'IDR' })}
                                  </Card.Text>
                                </Col>
                              </Row>
                            </Card.Body>

                            <Card.Footer>
                              <small className="text-muted">
                                <i class="far fa-calendar-alt" style={{ marginRight: '1%' }}></i>
                                {this.state.prodRevDateDesc}
                              </small>
                            </Card.Footer>
                          </Card>
                        )
                      })}
                    </Col>
                  }

                </Row>

                {this.state.prodMostBuy.length === 0
                ?
              null
                :
                <Container>
                  <div style={{ display: 'flex', height: '70vh' }}>
                    <div style={{ flexBasis: '40%' }}>
                      <Carousel >
                        {this.state.prodMostBuy.map((item, index) => {
                          return (
                            <Carousel.Item interval={1500} key={index}>
                              <img
                                className="d-block w-100"
                                src={`https://api-warehouse-3.purwadhikafs2.com/products/${item.productimg}`}
                                style={{ height: '70%', width: '100%' }}
                              />
                              <Carousel.Caption>
                                <h3 style={{ backgroundColor: 'rgba(181, 176, 179, 0.5)', color: 'black' }}>{item.product_name}</h3>
                                <p style={{ color: 'red' }}><strong>{item.category_name}</strong></p>
                              </Carousel.Caption>
                            </Carousel.Item>
                          )
                        })}
                      </Carousel>
                    </div>

                    <div style={{ flexBasis: '60%', padding: '0 2% 0 2%', marginTop: '10%' }}>
                      <h2 style={{ border: '5px solid white', borderRadius: '10px', padding: '1%', marginBottom: '5%', textAlign:'center'}}>Most Buy Product - All Time</h2>

                      <Row xs={1} md={3}>
                        {this.state.prodMostBuy.map((item, index) => {
                          if(item.TotalQtySold === null){
                            return (null)
                          }
                          return (
                            <Col>
                              <Card border="warning" bg="secondary" key={index}>
                                <Card.Header style={{textAlign:'center'}} ><strong style={{color:'white'}}>Number - {index + 1}</strong></Card.Header>
                                <ListGroup variant="flush">
                                  <ListGroup.Item style={{textAlign:'center'}}>{item.product_name}</ListGroup.Item>
                                  <ListGroup.Item style={{textAlign:'center'}}>{item.product_price.toLocaleString('id', { style: 'currency', currency: 'IDR' })} /pcs</ListGroup.Item>
                                  <ListGroup.Item style={{textAlign:'center'}}>{item.TotalQtySold} pcs sold</ListGroup.Item>
                                </ListGroup>
                              </Card>
                            </Col>
                          )
                        })}
                      </Row>

                    </div>
                  </div>
                </Container>
                }
              </Tab>
            </Tabs>
          </Container>

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
