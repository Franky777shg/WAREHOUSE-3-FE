
import React from 'react';
import Axios from 'axios'

import NavigationBar from "../components/NavigationBar"; 

import {Container, Col, Row, Form, Button, Tab, Tabs, Table, Alert} from 'react-bootstrap'
const URL_API = 'http://localhost:2000/user'

class ProfilePage extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            datauser: [],
            dataaddress: [],
            successUpdate: false,
            warning: null,
            warningvisible: false,


        }
    }

    fectDataAddress = () => {

            Axios.get(`${URL_API}/get-useraddress/14`)
            .then(res => {
                console.log(res.data)
                this.setState({ dataaddress: res.data })
              })
              .catch(err => {
                console.log(err)
              })
    }

    fectDataUser= () => {
    let token = localStorage.getItem("token")
        Axios.post(`${URL_API}/get-user/`, 
        {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(res => {
            console.log(res.data)
            this.setState({ datauser: res.data})
          })
          .catch(err => {
            console.log(err)
          })
    }
    componentDidMount() {
        this.fectDataUser()
        this.fectDataAddress()
    }

    onUpdateUser = () => {
        const usernameEdit = this.refs.usernameEdit.value
        const fullnameEdit = this.refs.fullnameEdit.value
        const emailEdit = this.refs.emailEdit.value
        const genderEdit = this.refs.genderEdit.value
        const ageEdit = +this.refs.ageEdit.value

        const dataUser = {
            username : usernameEdit,
            full_name : fullnameEdit,
            email : emailEdit,
            gender : genderEdit,
            age : ageEdit
            
        }

          
          
        let token = localStorage.getItem("token")
        Axios.post(`${URL_API}/update-user/`, 
        dataUser,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(res => {
            this.setState({ datauser: res.data })
            this.setState({ successUpdate: true})

        })
        .catch(err => {
            console.log(err)
            this.setState({warningvisible: true} )
            this.setState({warning: err.response.data} )
        })
    }

    render(){
        // console.log(this.state.datauser.map(item => { console.log(item.username) }))
        const { successUpdate, warningvisible, warning} = this.state

        return(
            <div>
                <NavigationBar/>
                <Container>
                        <Row style={styles.cont}>
                        <Col sm={4}>
                            <div style={styles.imgProfile}>
                                
                            </div>
                        </Col>
                        <Col sm={8}>                        
                            <div style={styles.dataProfile}>

                                    <Tabs defaultActiveKey="Profile" id="uncontrolled-tab-example" className="mb-3">
                                    {this.state.datauser.map(item => {
                                        return(   
                                            <Tab eventKey="Profile" title="Profile">      
                                             {successUpdate ? <Alert variant="success">Data Berhasil Disimpan</Alert> : null }
                                             {warningvisible ? <Alert variant="danger">{warning}</Alert> : null }

                                            <Form.Group className="mb-3" >
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control ref="usernameEdit" type="text" defaultValue={item.username} placeholder="Enter Username"  
                                                
                                                />
                                            
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Full Name</Form.Label>
                                                <Form.Control ref="fullnameEdit" type="text" defaultValue={item.full_name} placeholder="Enter Fullname" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control ref="emailEdit" type="text" defaultValue={item.email} placeholder="Enter Email" 
                                                 />
                                                
                                            </Form.Group>
                                            
                                            <Form.Group className="mb-3">
                                                <Form.Label>Gender</Form.Label>
                                                {/* <Form.Control ref="genderEdit" type="text" defaultValue={item.gender} placeholder="Enter Gender" /> */}
                                                <Form.Select ref="genderEdit" type="text" defaultValue={item.gender} size="md">
                                                    <option>Laki</option>
                                                    <option>Perempuan</option>

                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Age</Form.Label>
                                                <Form.Control ref="ageEdit" type="number" defaultValue={item.age} placeholder="Enter Age" />
                                            </Form.Group>
                                            <Button onClick={this.onUpdateUser}>Save</Button>
                                            </Tab>
                                         )
                                    })} 


                                    <Tab eventKey="Address" title="Address">
                                        <Table striped bordered hover size="sm">
                                        <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Address</th>
                                                    <th>Kecamatan</th>
                                                    <th>Kabupaten</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.dataaddress.map(item => {
                                                        return(
                                                            <tr>
                                                            <td>{item.id_address}</td>
                                                            <td>
                                                                <Form.Group className="mb-3">
                                                                <Form.Label>Address</Form.Label>
                                                                <Form.Control type="Address" defaultValue={item.address} placeholder="Enter Address" />
                                                                </Form.Group></td>
                                                            <td>
                                                                <Form.Group className="mb-3">
                                                                <Form.Label>Kecamatan</Form.Label>
                                                                <Form.Control type="Kecamatan" defaultValue={item.kecamatan} placeholder="Enter Kecamatan" />
                                                                </Form.Group>
                                                            </td>
                                                            <td>
                                                                <Form.Group className="mb-3">
                                                                <Form.Label>Kabupaten</Form.Label>
                                                                <Form.Control type="Kabupaten" defaultValue={item.kabupaten} placeholder="Enter Kabupaten" />
                                                                </Form.Group>
                                                            </td>
                                                        </tr>
                                                        )
                                                })}
                                            
                                            </tbody>                       
                                        </Table>
                                        </Tab>
                                    </Tabs>                                                            
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ProfilePage

const styles= {
    cont:{
        margin:'10vh 0vh'
    },
    imgProfile: {
        border : '1px solid black'
    },
    dataProfile: {
        border : '1px solid black',
        borderRadius: '2%',
        padding: '3vh'

    },
    changePass: {
        display: 'flex',
        flexDirection: 'row',
    }
} 