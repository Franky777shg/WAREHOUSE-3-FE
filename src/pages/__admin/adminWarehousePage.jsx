import React from "react";
import { Form, Button, Container, Table, Modal} from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";

import { connect } from "react-redux";
import { keepAdminLogin } from "../../redux/actions";

import NavigationBar from "../../components/__admin/NavigationBar";

const URL_API = "https://api-warehouse-3.purwadhikafs2.com/admin";

class AdminWarehousePage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            warehousestock: [],
            warehouseData: [],
            modalShowReq: false,
            idProd: null,
            idWarehouseselect: null,
            modalShowReqList: false,
            requestStockList: [],
            requestedStock: [],
            modalRequestedStock: false,
            warehouseName: null,
            IdReqEdit: null,
            stockReq: null,
            requestedStock1: [],
            idproductUpdate: null,
            prodqty: null

          }
         }

    fectWarehousStock = () => {
        const idwarehouse = this.refs.idwarehouse.value
      
        const obj = {
            id_warehouse : idwarehouse,   
        }

        // console.log('object',obj)

        Axios.post(`${URL_API}/get-wareshousestock`, obj)
        .then(res => {
            // console.log(res.data)
            this.setState({ warehousestock: res.data })
            // console.log(res.data[0].id_warehouse)
            this.setState({ idWarehouseselect: this.state.warehousestock[0].id_warehouse })
            this.setState({ warehouseName: this.state.warehousestock[0].warehouse_name })


        })
        .catch(err => {
            console.log(err)
        })
    }

    fectDataWarehouse = () => {
        Axios.get(`${URL_API}/get-warehousedata`)
        .then(res => {
            // console.log(res.data)
            this.setState({ warehouseData: res.data })
            this.allfunction()
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount(){

        // this.fectWarehousStock()
        this.fectDataWarehouse()
    }
    
    sendRequestStock = () =>{
        const IdProductReq = this.refs.IdProductReq.value
        const IdWarehouseReq = this.refs.IdWarehouseReq.value
        const WarehouseNameReqOri = this.refs.WarehouseNameReqOri.value
        const WarehouseTargetReq = this.refs.WarehouseTargetReq.value
        const ReqQuantity = this.refs.ReqQuantity.value
        const ReqStatus = this.refs.ReqStatus.value

        const obj = {
            id_product : IdProductReq,   
            id_warehouse_origin : IdWarehouseReq,
            warehouse_name_origin : WarehouseNameReqOri,      
            id_warehouse_target : WarehouseTargetReq,   
            quantity : ReqQuantity,   
            status : ReqStatus 

        }

        // console.log(obj)

        Axios.post(`${URL_API}/req-wareshousestock/`, obj)
          .then(res => {
                console.log(res)
          })
          .catch(err => {
              console.log(err)
          })
    }

    fetchStockRequestList = () =>{      
        const idwarehouse = this.refs.idwarehouse.value
      
        const obj = {
            id_warehouse_origin : idwarehouse   
        }

        // console.log(obj)

        Axios.post(`${URL_API}/get-stockrequestlist`, obj)
        .then(res => {
            // console.log(res.data)
            this.setState({ requestStockList: res.data })
            // console.log(this.state.requestStockList)
            // console.log(res.data[0].id_warehouse)
        })
        .catch(err => {
            console.log(err)
        })
    }

    fetchRequestedStock = () =>{      
        const idwarehouse = this.refs.idwarehouse.value
      
        const obj = {
            id_warehouse_target : idwarehouse   
        }

        // console.log(obj)

        Axios.post(`${URL_API}/get-requestedstock`, obj)
        .then(res => {
            console.log("post",res.data)
            this.setState({ requestedStock: res.data })
            // this.setState({ stockReq: this.state.requestedStock[0].stock_op })

            // console.log(this.state.requestedStock)

        })
        .catch(err => {
            console.log(err)
        })
    }

    updateRequestedStock = (id) => {
        const ReqStatusUpdate = this.refs.ReqStatusUpdate.value
        const idwarehouse = this.refs.idwarehouse.value

        let obj = {
            status : ReqStatusUpdate,
            id_warehouse_target : idwarehouse

        }

        console.log('obj',obj)

        Axios.post(`${URL_API}/update-requestedstock/${id}`, obj)
        .then(res => {
            console.log("patch",res.data)
            this.setState({ requestedStock1: res.data , IdReqEdit: null})
            this.allfunction()
            this.ReduceStock()

        })
        .catch(err => {
            console.log(err)
        })
    }

    updateRequestedList = (id) => {
        const ReqStatusUpdate = this.refs.ReqStatusUpdate.value
        const idwarehouse = this.refs.idwarehouse.value

        let obj = {
            status : ReqStatusUpdate,
            id_warehouse_target : idwarehouse

        }

        console.log('obj',obj)

        Axios.post(`${URL_API}/update-requestedlist/${id}`, obj)
        .then(res => {
            console.log("patch",res.data)
            this.setState({ requestedStock1: res.data , IdReqEdit: null})
            this.allfunction()
            this.IncreaseStock()

        })
        .catch(err => {
            console.log(err)
        })
    }
    
    ReduceStock = () => {
        const ProdQty = this.state.prodqty
        const idProd = this.state.idproductUpdate
        const warehouse = this.refs.idwarehouse.value

        let obj = {
            quantity : ProdQty,
            id_product : idProd,
            id_warehouse : warehouse
        }
        
        console.log(obj)
        Axios.post(`${URL_API}/update-reducestock`, obj)
        .then(res => {
            console.log("reduce",res.data)
            // this.setState({ requestedStock1: res.data , IdReqEdit: null})
        })
        .catch(err => {
            console.log(err)
        })
    }

    IncreaseStock = () => {
        const ProdQty = this.state.prodqty
        const idProd = this.state.idproductUpdate
        const warehouse = this.refs.idwarehouse.value

        let obj = {
            quantity : ProdQty,
            id_product : idProd,
            id_warehouse : warehouse
        }
        
        console.log(obj)
        Axios.post(`${URL_API}/update-increasestock`, obj)
        .then(res => {
            console.log("increase",res.data)
            // this.setState({ requestedStock1: res.data , IdReqEdit: null})
        })
        .catch(err => {
            console.log(err)
        })
    }

    allfunction = () => {
        this.fectWarehousStock()
        this.fetchStockRequestList()
        this.fetchRequestedStock()
    }

  render() {
    if (localStorage.getItem("admin_token")) {
      this.props.keepAdminLogin();
    }
    if (!this.props.adminUsername) {
      return <Redirect to="/auth/admin/login" />;
    }
    // console.log(this.state.idProd)
    // console.log(this.state.idWarehouse)
    // console.log(this.state.requestStockList)
    // console.log(this.state.IdReqEdit)
    // console.log(this.state.requestedStock)
    // console.log(this.state.stockReq)
    // console.log(this.state.idproductUpdate)
    // console.log(this.state.prodqty)

    return (
      <React.Fragment>
        <NavigationBar />
        
        <Container>
                    <Form.Select ref="idwarehouse" type="text"  size="md">
                        {this.state.warehouseData.map((item, index) => {
                              return(
                                  <option value={item.id_warehouse}>{item.id_warehouse}.{item.warehouse_name}</option>
                                    )
                              })}
                    </Form.Select>
                        {/* <Form.Control ref="idwarehouse" 
                        type="text" 
                        placeholder="Enter Warehouse ID " />     */}
                        <Button onClick={
                            () => this.allfunction()} >Select</Button>          
                        <Button variant="info" onClick={ () => this.setState({ modalShowReqList: true }) }>Request List</Button>
                        <Button variant="warning" onClick={ () => this.setState({ modalRequestedStock: true }) }>Request</Button>

                        <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Stock OP</th>
                                    <th>Stock Booked</th>

                                    <th>Warehouse Name</th>
                                    <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.warehousestock.map((item, index) => {
                                    return(
                                    <tr>
                                    <td>{item.id_product}</td>
                                    <td>{item.product_name}</td>
                                    <td>{item.stock_op}</td>
                                    <td>{item.stock_booked}</td>
                                    <td>{item.warehouse_name}</td>
                                    <td>
                                        <Button variant="success" onClick={() => this.setState({ 
                                            modalShowReq: true,  
                                            idProd: item.id_product})}>Send Request</Button>
                                    </td>
                                    </tr>        
                                    )
                                })}                     
                                </tbody>
                        </Table>
        </Container>
        {/* Request Stock */}
            <Modal show={this.state.modalShowReq} >
                    <Modal.Header>
                        <Modal.Title>Request Stock</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                    <Form.Label>Id Product</Form.Label>
                        <Form.Control ref="IdProductReq" type="text" defaultValue={this.state.idProd} disabled/>
                    <Form.Label>Id Warehouse</Form.Label>
                        <Form.Control ref="IdWarehouseReq" type="text" defaultValue={this.state.idWarehouseselect} disabled/>
                    <Form.Label>Warehouse Asal</Form.Label>
                        <Form.Control ref="WarehouseNameReqOri" type="text" defaultValue={this.state.warehouseName} disabled/>
                    <Form.Label>Warehouse Tujuan</Form.Label>
                        <Form.Select ref="WarehouseTargetReq" type="text"  size="md">
                            {this.state.warehouseData.map((item, index) => {
                                return(
                                    <option value={item.id_warehouse}>{item.warehouse_name}</option>
                                        )
                                })}
                        </Form.Select>
                    <Form.Label>Request Quantity</Form.Label>
                        <Form.Control ref="ReqQuantity" type='number' />
                    <Form.Label>Status</Form.Label>
                        {/* <Form.Control ref="ReqStatus" type="text" placeholder="Enter Provinsi " />   */}
                        <Form.Select ref="ReqStatus" type="text" size="md">
                                    <option>Pending</option>
                                    <option>Shipped</option>
                                    <option>Arrived</option>
                        </Form.Select>                       
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ modalShowReq: false })} >Close</Button>
                        <Button variant="primary" onClick={this.sendRequestStock} >Send Request</Button>
                    </Modal.Footer>
            </Modal>
        {/* Request Stock */}
        {/* Request list */}
            <Modal size="lg" show={this.state.modalShowReqList} >
                    <Modal.Header>
                        <Modal.Title>Request List</Modal.Title>
                    </Modal.Header>
                        <Modal.Body >
                            <Table striped bordered hover size="lg">
                                    <thead>
                                        <tr>
                                        <th>id</th>
                                        <th>Id Product</th>
                                        <th>Product Name</th>
                                        <th>Warehouse Asal</th>
                                        <th>Warehouse Tujuan</th>
                                        <th>Stock OP</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.requestStockList.map((item, index) => {
                                        if(this.state.IdReqEdit === item.id_stock){
                                            return(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{item.id_product}</td>
                                                <td>{item.product_name}</td>
                                                <td>{item.warehouse_name_origin}</td>
                                                <td>{item.id_warehouse_target}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.status}</td>
                                                <td>
                                                {/* <Form.Control ref="ReqStatusUpdate" type="text" placeholder="Enter Status " />   */}
                                                <Form.Select ref="ReqStatusUpdate" type="text" size="md">
                                                            <option>Pending</option>
                                                            <option>Shipped</option>
                                                            <option>Arrived</option>
                                                </Form.Select>              
                                                </td>
                                            <td>
                                                <Button onClick={() => this.updateRequestedList(item.id_stock)} variant="success">Save</Button> 
                                                <Button onClick={() => this.setState({ IdReqEdit: null , })}>Cancel</Button>
                                            </td>
                                            </tr>        
                                        )
                                        }return(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{item.id_product}</td>
                                                <td>{item.product_name}</td>
                                                <td>{item.warehouse_name_origin}</td>
                                                <td>{item.id_warehouse_target}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.status}</td>
                                                <td>
                                                <Button onClick={() => this.setState({ IdReqEdit: item.id_stock, idproductUpdate: item.id_product, prodqty: item.quantity })}>Update</Button>
                                                </td>
                                            </tr>       
                                            )
                                    })}                     
                                    </tbody>
                            </Table>
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ modalShowReqList: false })} >Close</Button>
                    </Modal.Footer>
            </Modal>
        {/* Request list */}
        {/* Requested Stock */}
        <Modal  size="lg" show={this.state.modalRequestedStock}  >
                    <Modal.Header>
                        <Modal.Title>Request List</Modal.Title>
                    </Modal.Header>
                        <Modal.Body >
                            <Table striped bordered hover size="lg">
                                    <thead>
                                        <tr>
                                        <th>id</th>
                                        <th>Id Product</th>
                                        <th>Product Name</th>
                                        <th>Warehouse Asal</th>
                                        <th>Warehouse Tujuan</th>
                                        <th>Stock OP</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    {this.state.requestedStock.map((item, index) => {
                                       if(this.state.IdReqEdit === item.id_stock){
                                        return(
                                            <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{item.id_product}</td>
                                            <td>{item.product_name}</td>
                                            <td>{item.warehouse_name_origin}</td>
                                            <td>{this.state.warehouseName}</td>
                                            <td>{item.quantity}</td>
                                            <td>
                                                {/* <Form.Control ref="ReqStatusUpdate" type="text" placeholder="Enter Status " />   */}
                                                <Form.Select ref="ReqStatusUpdate" type="text" size="md">
                                                            <option>Pending</option>
                                                            <option>Shipped</option>
                                                            <option>Arrived</option>
                                                </Form.Select>              
                                            </td>
                                            <td>
                                                <Button onClick={() => this.updateRequestedStock(item.id_stock)} variant="success">Save</Button> 
                                                <Button onClick={() => this.setState({ IdReqEdit: null })}>Cancel</Button>
                                            </td>
                                            </tr>        
                                                )
                                        }return(
                                            <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{item.id_product}</td>
                                            <td>{item.product_name}</td>
                                            <td>{item.warehouse_name_origin}</td>
                                            <td>{this.state.warehouseName}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <Button onClick={() => this.setState({ IdReqEdit: item.id_stock, idproductUpdate: item.id_product, prodqty: item.quantity })}>Update</Button>
                                            </td>

                                            </tr> 
                                        )
                                      })}              
                                    </tbody>
                            </Table>
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ modalRequestedStock: false, IdReqEdit: null })} >Close</Button>
                    </Modal.Footer>
            </Modal>

        {/* Requested Stock */}

      </React.Fragment>

      
    );
  }
}

const styles= {
    modalsize:{
        width: "1%",
        height: "100%"
  
    },
}

const mapStateToProps = (state) => {
  return {
    adminUsername: state.adminReducer.adminUsername,
  };
};

export default connect(mapStateToProps, { keepAdminLogin })(AdminWarehousePage);
