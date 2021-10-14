import React from "react";
import { Form, Button, Container, Table, Modal, FloatingLabel,Tabs, Tab } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";

import { connect } from "react-redux";
import { keepAdminLogin } from "../../redux/actions";

import NavigationBar from "../../components/__admin/NavigationBar";

const URL_API = "http://localhost:2000/admin";

class SuperAdminPage extends React.Component {

        constructor(props){
          super(props)
          this.state = {
              dataWarehouse: [],
              modalShow: false

            }
           }

          fectDataWarehouse = () => {
              Axios.get(`${URL_API}/get-warehousedata`)
              .then(res => {
                  console.log(res.data)
                  this.setState({ dataWarehouse: res.data })
              })
              .catch(err => {
                  console.log(err)
              })
          }

          componentDidMount () {
            this.fectDataWarehouse()
          }

          onAddWarehouse = () => {
            const warehouse_name = this.refs.warehouse_name.value
            const waddressadd = this.refs.waddressadd.value
            const wkecamatanadd = this.refs.wkecamatanadd.value
            const wkabupatenadd = this.refs.wkabupatenadd.value
            const wprovinsiadd = this.refs.wprovinsiadd.value
        
            const warehouseinput = {
                warehouse_name : warehouse_name,
                warehouse_address : waddressadd,
                warehouse_kecamatan : wkecamatanadd,
                warehouse_kabupaten : wkabupatenadd,
                warehouse_provinsi : wprovinsiadd
        
            }
            console.log(warehouseinput)
        
            // let token = localStorage.getItem("token")
            Axios.post(`${URL_API}/add-warehousedata`, warehouseinput,)
            .then(res => {
                this.setState({ dataWarehouse: res.data })
                this.fectDataWarehouse()
                this.setState({modalShow: false})
            })
            .catch(err => {
                console.log(err)
            })
        }


  render() {
    if (localStorage.getItem("admin_token")) {
      this.props.keepAdminLogin();
    }
    if (!this.props.adminUsername) {
      return <Redirect to="/auth/admin/login" />;
    }
    return (
      <div>
        <NavigationBar />
        <Container >
          <div style={styles.cont}>
                <Tabs defaultActiveKey="Admin Management" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="Admin Management" title="Admin Management">
                </Tab>
                <Tab eventKey="Warehouse Management" title="Warehouse Management">
                    <Table striped bordered hover size="sm" >
                                          <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>warehouse_name</th>
                                                <th>warehouse_address</th>
                                                  <th>warehouse_kecamatan</th>
                                                <th>warehouse_kabupaten</th>
                                                              <th>warehouse_provinsi</th>
                                                          </tr>
                                                  </thead>
                                                  <tbody>
                                                      {this.state.dataWarehouse.map((item, index) => {
                                                          return(
                                                              <tr key={index}>
                                                                  <td>{index + 1}</td>
                                                                  <td>{item.warehouse_name}</td>
                                                                  <td>{item.warehouse_address}</td>
                                                                  <td>{item.warehouse_kecamatan}</td>
                                                                  <td>{item.warehouse_kabupaten}</td>
                                                                  <td>{item.warehouse_provinsi}</td>
                                                              </tr>
                                                              )
                                                      })}
                                                      </tbody> 
        
                      </Table>
                    <Button onClick={() => this.setState({ modalShow: true })}>ADD</Button>
                </Tab>
              
                </Tabs>
          </div>
        
          
            <Modal show={this.state.modalShow}>
                    <Modal.Header>
                        <Modal.Title>Add New Warehouse</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={styles.inputAdd}>
                    <FloatingLabel controlId="floatingPassword" label="Warehouse Name">
                        <Form.Control ref="warehouse_name" type="text" placeholder="Enter Warehouse Name " />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Address">
                        <Form.Control ref="waddressadd" type="text" placeholder="Enter Address " />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Kecamatan">
                        <Form.Control ref="wkecamatanadd" type="text" placeholder="Enter Kecamatan " />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Kabupaten">
                        <Form.Control ref="wkabupatenadd" type="text" placeholder="Enter Kabupaten " />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Provinsi">
                        <Form.Control ref="wprovinsiadd" type="text" placeholder="Enter Provinsi " />               
                    </FloatingLabel>
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ modalShow: false })}>Close</Button>
                        <Button variant="primary" onClick={this.onAddWarehouse}>Add</Button>
                    </Modal.Footer>
                </Modal>
        </Container>
      </div>
        
    );
  }
}

const styles= {
  cont:{
   border: '1px solid black',
   marginTop: '3vh',
   borderRadius: '10px',
   padding: '5vh'

  },
  inputAdd:{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
  }
}

const mapStateToProps = (state) => {
  return {
    adminUsername: state.adminReducer.adminUsername,
  };
};

export default connect(mapStateToProps, { keepAdminLogin })(SuperAdminPage);
