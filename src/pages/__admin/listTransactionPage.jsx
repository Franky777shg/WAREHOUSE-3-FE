import React from "react";
import { Form, Button, Container, Table, Modal } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";

import { connect } from "react-redux";
import { keepAdminLogin } from "../../redux/actions";

import NavigationBar from "../../components/__admin/NavigationBar";

const URL_API = "http://localhost:2000/admin";

class ListTransactionPage extends React.Component {


    constructor(props){
        super(props)
        this.state = {
            dataTransaction: [],
            dataTransactiondetail: [],
            showImage: false,
            showDetail: false,
            idOrder: null,
            idEdit: null
        }
    }
    
        
    
    fecthDataTransaction = () => {
        Axios.get(`${URL_API}/get-transactionlist`)
        .then(res => {
            if(!res.data){
                console.log('NOT FOUND')
            }else{
                console.log(res.data)
                this.setState({dataTransaction: res.data})
                console.log(this.state.dataTransaction)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    fecthDataTransactionDetail = () => {
        const idOrder = this.state.idOrder

        let obj = {
            order_number : idOrder,
     
        }
        
        console.log("hello",obj)
        Axios.post(`${URL_API}/get-transactionlistdetail`, obj)
        .then(res => {
            if(!res.data){
                console.log('NOT FOUND')
            }else{
                console.log(res.data)
                this.setState({dataTransactiondetail: res.data})
                console.log(this.state.dataTransactiondetail)
                // this.fecthDataTransactionDetail()
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    updateStatus = () => {
        const statuspay = this.refs.statuspay.value
        const idOrder = this.state.idOrder
        let obj = {
            ordernumber : idOrder,
            status : statuspay
        }
        
        console.log("updateStatus",obj)
        Axios.post(`${URL_API}/get-updatePayment`, obj)
        .then(res => {
            if(!res.data){
                console.log('NOT FOUND')
            }else{
                console.log(res.data)
                this.setState({dataTransaction: res.data, idEdit: null})
                // this.fecthDataTransactionDetail()
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    filterDataTransaction = () => {
        let number = this.refs.number.value

        // console.log(filter)

        let obj = {
            number
        }
        console.log(obj)
        if (this.refs.number.value == null ) {
            return (null)
        } else {
        
            Axios.post(`${URL_API}/filter-transactionlist`, obj)
            .then(res => {
                console.log(res.data)
                this.setState({dataTransaction: res.data})
    
            })
            .catch(err => {
                console.log(err)
            })
        }

        
    }

    detail(id){
        this.fecthDataTransactionDetail()
        this.setState({showDetail : true, idOrder : id})

    }

    componentDidMount(){
        this.fecthDataTransaction()

    }


  render() {
    if (localStorage.getItem("admin_token")) {
      this.props.keepAdminLogin();
    }
    if (!this.props.adminUsername) {
      return <Redirect to="/auth/admin/login" />;
    }
    console.log(this.state.idOrder)
    return (
      <React.Fragment>
        <NavigationBar />
        <Container>
            <div style={styles.filterCont}>
             <Form.Control type="text" placeholder="Order Number"
             ref="number" />
            <Button onClick={() => this.filterDataTransaction()}>Search</Button>
                </div>
                               {/* <Button onClick={() => this.fecthDataTransactionDetail()}> Get </Button> */}

                            <Table striped bordered hover style={styles.contTransations}>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <td>Order Number</td>
                                    <td>Bukti Pembayaran</td>
                                    <td>Tanggal Pemesanan</td>
                                    <td>Tanggal Pembayaran</td>
                                    <td>Nama Pemilik Rekening</td>
                                    <td>User</td>
                                    <td>Nominal</td>
                                    <td>Status Pembayaran</td>
                                    <td> Detail </td>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.dataTransaction.map((item,index) => {
                                    if(this.state.idEdit === item.order_number){
                                        return(
                                            <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.order_number}</td>
                                            <td>
                                                <Button onClick={() => this.setState({showImage : true})} disabled >Show Image</Button>
                                            </td>
                                            <td>{item.order_date}</td>
                                            <td>{item.date}</td>
                                            <td>{item.nama_pemilik_rekening}</td>
                                            <td>{item.username}</td>
                                            <td>{item.nominal}</td>
                                            <td>
                                            <Form.Select ref="statuspay" type="text"  size="md" defaultValue={item.status}> 
                                                                 <option > Pending</option>
                                                                 <option > Processed</option>
                                                                 <option > Shipped</option>
                                                                 <option > Arrived</option>

                                            </Form.Select>
                                            </td>
                                            <td>
                                            <Button  onClick={() =>this.updateStatus()} variant="success">Save</Button>
                                            <Button  onClick={() => this.setState({ idEdit: null })} variant="success">Cancel</Button>

                                            {/* onClick={() => this.setState({showDetail : true , idOrder : item.order_number})} */}
                                            </td>

                                            </tr>         
                                        )
                                    } return(
                                        <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.order_number}</td>
                                        <td>
                                            <Button onClick={() => this.setState({showImage : true})} >Show Image</Button>
                                        </td>
                                        <td>{item.order_date}</td>
                                        <td>{item.date}</td>
                                        <td>{item.nama_pemilik_rekening}</td>
                                        <td>{item.username}</td>
                                        <td>{item.nominal}</td>
                                        <td>{item.status}</td>
                                        <td>
                                        <Button  onClick={() => this.setState({ idEdit: item.order_number,  idOrder : item.order_number})} variant="success">Edit</Button>
                                        <Button  onClick={() =>this.detail(item.order_number)} variant="success">Show Detail</Button>
                                        {/* onClick={() => this.setState({showDetail : true , idOrder : item.order_number})} */}
                                        </td>

                                        </tr> 
                                    )
                                })}
                                                  
                                </tbody>
                            </Table>
        </Container>
        <Modal size="lg" show={this.state.showImage} >
                    <Modal.Header>
                        <Modal.Title>Request Stock</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                    {this.state.dataTransaction.map((item,index) => {
                        return(
                            <img src={item.payment_image} alt="" style={styles.imagesize}/>
                        )
                    })}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({showImage : false})}> Close</Button>

                    </Modal.Footer>
        </Modal>

        <Modal size="lg" show={this.state.showDetail} >
                    <Modal.Header>
                        <Modal.Title>Request Stock</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                    <Table striped bordered hover style={styles.contTransations}>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <td>Order Number</td>
                                    <td>Tanggal Pemesanan</td>
                                    <td>Product Name</td>
                                    <td>Quantity</td>
                                    <td>Status Pembayaran</td> 
                                    <td>Harga</td>    
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.dataTransactiondetail.map((item,index) => {
                                        return(
                                            <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.order_number}</td>
                                            <td>{item.order_date}</td>
                                            <td>{item.product_name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.status}</td>
                                            <td>{item.product_price * item.quantity}</td>

                                            </tr>         
                                        )
                                })}
                                                  
                                </tbody>
                            </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({showDetail : false})}> Close</Button>

                    </Modal.Footer>
        </Modal>
      </React.Fragment>



    );
  }
}

const styles= {
    contTransations:{
     marginTop: '3vh',
  
    },
    filterCont: {
        display: 'flex',
        flexDirection: 'row'
    },
    imagesize: {
            height: "100%",
            width: "100%",
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
    }
    
  }

const mapStateToProps = (state) => {
  return {
    adminUsername: state.adminReducer.adminUsername,
  };
};

export default connect(mapStateToProps, { keepAdminLogin })(ListTransactionPage);
