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
            console.log(res.data)
            this.setState({dataTransaction: res.data})
        })
        .catch(err => {
            console.log(err)
        })
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
                                            <tr ket={index}>
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
    
  }

const mapStateToProps = (state) => {
  return {
    adminUsername: state.adminReducer.adminUsername,
  };
};

export default connect(mapStateToProps, { keepAdminLogin })(ListTransactionPage);
