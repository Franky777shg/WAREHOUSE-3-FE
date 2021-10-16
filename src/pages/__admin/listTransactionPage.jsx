import React from "react";
import { Form, Button, Container, Table } from "react-bootstrap";
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
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    filterDataTransaction = () => {
        let full_name = this.refs.fullname.value
        console.log(full_name)

        let obj = {
            full_name
        
        }
        console.log(obj)
        if (this.refs.fullname.value == null) {
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
    return (
      <React.Fragment>
        <NavigationBar />
        <Container>
            <div style={styles.filterCont}>
            <Form.Control type="text" placeholder="Search"
             ref="fullname" />
            <Button onClick={() => this.filterDataTransaction()}>Search</Button>
                </div>
       
                            <Table striped bordered hover style={styles.contTransations}>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Full Name</th>
                                    <th>Address</th>
                                    <th>Kecamatan</th>
                                    <th>Kabupaten</th>
                                    <th>Total Price</th>
                                    <th>Quantity</th>
                                    <th>Product Name</th>

                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.dataTransaction.map((item,index) => {
                                        return(
                                            <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.full_name}</td>
                                            <td>{item.address}</td>
                                            <td>{item.kecamatan}</td>
                                            <td>{item.kabupaten}</td>
                                            <td>{item.total_price}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.product_name}</td>
                                            </tr>         
                                        )
                                })}
                                                  
                                </tbody>
                            </Table>
        </Container>
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
    }
    
  }

const mapStateToProps = (state) => {
  return {
    adminUsername: state.adminReducer.adminUsername,
  };
};

export default connect(mapStateToProps, { keepAdminLogin })(ListTransactionPage);
