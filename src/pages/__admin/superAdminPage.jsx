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
              modalShow: false,
              admin_name: [],
              idEdit: null

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

          fectDataAdmin = () => {
            Axios.get(`${URL_API}/get-admindata`)
            .then(res => {
                console.log(res.data)
                this.setState({ admin_name: res.data })

            })
            .catch(err => {
                console.log(err)
            })
        }


          componentDidMount () {
            this.fectDataWarehouse()
            this.fectDataAdmin()
          }

          onAddWarehouse = () => {
            const warehouse_name = this.refs.warehouse_name.value
            const waddressadd = this.refs.waddressadd.value
            const wkecamatanadd = this.refs.wkecamatanadd.value
            const wkabupatenadd = this.refs.wkabupatenadd.value
            const wprovinsiadd = this.refs.wprovinsiadd.value
            const adminname = this.refs.adminname.value

            const warehouseinput = {
                warehouse_name : warehouse_name,
                warehouse_address : waddressadd,
                warehouse_kecamatan : wkecamatanadd,
                warehouse_kabupaten : wkabupatenadd,
                warehouse_provinsi : wprovinsiadd,
                id_admin : adminname
        
            }
            console.log(warehouseinput)
        
            // let token = localStorage.getItem("token")
            Axios.post(`${URL_API}/add-warehousedata`, warehouseinput,)
            .then(res => {
                this.setState({ dataWarehouse: res.data })
                this.onStockdefaultinput()
                this.fectDataWarehouse()
                this.setState({modalShow: false})
            })
            .catch(err => {
                console.log(err)
            })
          }


        onUpdateWarehouse = (id) => {
          const warehouse_nameEdit = this.refs.warehouse_nameEdit.value
          const waddressaddEdit = this.refs.waddressaddEdit.value
          const wkecamatanaddEdit = this.refs.wkecamatanaddEdit.value
          const wkabupatenaddEdit = this.refs.wkabupatenaddEdit.value
          const wprovinsiaddEdit = this.refs.wprovinsiaddEdit.value
          const adminnameEdit = this.refs.adminnameEdit.value

          const warehouseEdit = {
              warehouse_name : warehouse_nameEdit,
              warehouse_address : waddressaddEdit,
              warehouse_kecamatan : wkecamatanaddEdit,
              warehouse_kabupaten : wkabupatenaddEdit,
              warehouse_provinsi : wprovinsiaddEdit,
              id_admin : adminnameEdit
      
          }
          console.log(warehouseEdit)
      
          // let token = localStorage.getItem("token")
          Axios.put(`${URL_API}/update-warehousedata/${id}`, warehouseEdit,)
          .then(res => {
              this.setState({ dataWarehouse: res.data, idEdit: null })
              this.fectDataWarehouse()
              
          })
          .catch(err => {
              console.log(err)
          })

        }

        onStockdefaultinput = () => {
          const idwarehouse = this.refs.idwarehouse.value
      
      
          const stockdefaultinput = {
            id_warehouse : idwarehouse,
             
          }
          console.log(stockdefaultinput)
      
          // let token = localStorage.getItem("token")
          Axios.post(`${URL_API}/add-stock-default`, stockdefaultinput)
          .then(res => {
              console.log(res)
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
                                                <th>admin_name</th>
                                                <th>action</th>


                                                </tr>
                                                  </thead>
                                                  <tbody>
                                                      {this.state.dataWarehouse.map((item, index) => {
                                                      if(this.state.idEdit === item.id_warehouse){
                                                          return(
                                                            <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                <Form.Control ref="warehouse_nameEdit" type="text" defaultValue={item.warehouse_name} placeholder="Enter Warehouse Name " />
                                                            </td>
                                                            <td>
                                                                <Form.Control ref="waddressaddEdit" defaultValue={item.warehouse_address} type="text" placeholder="Enter Address " />
                                                            </td>
                                                            <td>
                                                            <FloatingLabel controlId="floatingPassword"   label="Kecamatan">
                                                                <Form.Control ref="wkecamatanaddEdit" defaultValue={item.warehouse_kecamatan} type="text" placeholder="Enter Kecamatan " />
                                                            </FloatingLabel>
                                                            </td>
                                                            <td>
                                                                <Form.Control ref="wkabupatenaddEdit" defaultValue={item.warehouse_kabupaten} type="text" placeholder="Enter Kabupaten " />
                                                            </td>
                                                            <td>
                                                                <Form.Control ref="wprovinsiaddEdit" defaultValue={item.warehouse_provinsi} type="text" placeholder="Enter Provinsi " />               
                                                            </td>
                                                            <td>
                                                            <Form.Select ref="adminnameEdit" type="text"  size="md">
                                                            {this.state.admin_name.map((item, index) => {
                                                                  return(
                                                                    <option value={item.id_admin}>{item.admin_name}</option>
                                                                    )
                                                                  })}
                                                            </Form.Select>
                                                            </td>
                                                            <td>
                                                                <Button variant="outline-success" onClick={() => this.onUpdateWarehouse(item.id_warehouse)}>Save</Button>
                                                                <Button variant="outline-danger" onClick={() => this.setState({ idEdit: null })}>Cancel</Button>
                                                            </td>
                                                        </tr>
                                                              )
                                                          }return(
                                                              <tr key={index}>
                                                                  <td>
                                                                    {/* {item.id_warehouse} */}
                                                                    <Form.Control plaintext ref="idwarehouse" defaultValue={item.id_warehouse} disabled/>

                                                                    </td>
                                                                  <td>{item.warehouse_name}</td>
                                                                  <td>{item.warehouse_address}</td>
                                                                  <td>{item.warehouse_kecamatan}</td>
                                                                  <td>{item.warehouse_kabupaten}</td>
                                                                  <td>{item.warehouse_provinsi}</td>
                                                                  <td>{item.admin_name}</td>
                                                                  <td>
                                                                    <Button variant="outline-warning" onClick={() => this.setState({ idEdit: item.id_warehouse })}>Edit</Button>
                                                                  </td>
                                                              </tr>
                                                          )
                                                      })}
                                                      </tbody> 
        
                      </Table>
                    <Button onClick={() => this.setState({ modalShow: true })}>ADD</Button>

                </Tab>
              
                </Tabs>
          </div>
        
          
            <Modal show={this.state.modalShow} >
                    <Modal.Header>
                        <Modal.Title>Add New Warehouse</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={styles.inputAdd}>
                    <Form.Label>Warehouse Name</Form.Label>
                        <Form.Control ref="warehouse_name" type="text" placeholder="Enter Warehouse Name " />
                    <Form.Label>Address</Form.Label>
                        <Form.Control ref="waddressadd" type="text" placeholder="Enter Address " />
                    <Form.Label>Kecamatan</Form.Label>
                        <Form.Control ref="wkecamatanadd" type="text" placeholder="Enter Kecamatan " />
                    <Form.Label>Kabupaten</Form.Label>
                        <Form.Control ref="wkabupatenadd" type="text" placeholder="Enter Kabupaten " />
                    <Form.Label>Provinsi</Form.Label>
                        <Form.Control ref="wprovinsiadd" type="text" placeholder="Enter Provinsi " />               
                    {/* <FloatingLabel controlId="floatingPassword" label="admin">
                        <Form.Control ref="idadmin" type="text" placeholder="Enter idadmin " />               
                    </FloatingLabel>  
                                                                               */}
                     <Form.Label>Admin</Form.Label>
                    <Form.Select ref="adminname" type="text"  size="md">
                        {this.state.admin_name.map((item, index) => {
                              return(
                                  <option value={item.id_admin}>{item.admin_name}</option>
                                    )
                              })}
                    </Form.Select>
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
      justifyContent: 'space-between',
      margin: '1vh'

  }
}

const mapStateToProps = (state) => {
  return {
    adminUsername: state.adminReducer.adminUsername,
  };
};

export default connect(mapStateToProps, { keepAdminLogin })(SuperAdminPage);
