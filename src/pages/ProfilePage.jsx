
import React from 'react';
import Axios from 'axios'
import NavigationBar from "../components/NavigationBar"; 

import {Container, Col, Row, Form, Button, Tab, Tabs, Table, Alert, Image} from 'react-bootstrap'
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
            idEdit: null,
            images: ''


        }
    }

    fectDataAddress = () => {
    let token = localStorage.getItem("token")
            Axios.post(`${URL_API}/get-useraddress/`,
            {},
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
            )
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
            'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(res => {
            console.log(res.data)
            this.setState({ datauser: res.data})
            this.setState({ images : res.data[0].profile_picture})

          })
          .catch(err => {
            console.log(err)
          })
    }
    // getUserProfile = () => {
    //     let token = localStorage.getItem("token")
    //     Axios.post(`${URL_API}/get-user/`,
    //     {},
    //       {
    //         headers: {
    //         'Content-Type': 'multipart/form-data',
    //           Authorization: `Bearer ${token}`,
    //         },
    //       })
    //     .then(res => {
    //         // console.log("dataget", res.data[0].profile_picture)
    //     })
    //     .catch(err => {
    //         console.log("error get", err)
    //     })
    // }
    componentDidMount() {
        this.fectDataUser()
        this.fectDataAddress()
        // this.getUserProfile()

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

    onAddAddress = () => {
        const addressadd = this.refs.addressadd.value
        const kecamatanadd = this.refs.kecamatanadd.value
        const kabupatenadd = this.refs.kabupatenadd.value
        const status_aktifadd = this.refs.status_aktifadd.value

        const addressInput = {
            address : addressadd,
            kecamatan : kecamatanadd,
            kabupaten : kabupatenadd,
            status_aktif : status_aktifadd
        }
        console.log(addressInput)

        let token = localStorage.getItem("token")
        Axios.post(`${URL_API}/get-add-user-address/`, 
        addressInput,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(res => {
            this.setState({ dataaddress: res.data })

        })
        .catch(err => {
            console.log(err)
        })
    }

    onEditAddress = (id) => {
        const addressEdit = this.refs.addressEdit.value
        const kecamatanEdit = this.refs.kecamatanEdit.value
        const kabupatenEdit = this.refs.kabupatenEdit.value
        const status_aktifadd = this.refs.status_aktifadd.value

        const editAddress = {
            address : addressEdit,
            kecamatan : kecamatanEdit,
            kabupaten : kabupatenEdit,
            status_aktif : status_aktifadd

        }
        console.log(editAddress)

        let token = localStorage.getItem("token")
        Axios.post(`${URL_API}/get-update-user-address/`, 
        editAddress,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(res => {
            this.setState({ dataaddress: res.data, idEdit: null })

        })
        .catch(err => {
            console.log(err)
        })
    }

    onDeleteAddress = (id) => {
        let token = localStorage.getItem("token")
        Axios.delete(`${URL_API}/get-delete-user-address/${id}`, 
        // {},
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   },
        )
        .then(res => {
            this.setState({ dataaddress: res.data })
            this.fectDataAddress()

        })
        .catch(err => {
            console.log(err)
        })
    }

    handleChoose = (e) => {
        console.log('e.target.files', e.target.files)
        this.setState({ images: e.target.files[0] })
    }

    handleUpload = () => {
        const data = new FormData()
        console.log(data)
        data.append('IMG', this.state.images)
        console.log(data.get('IMG'))

        let token = localStorage.getItem("token")
        Axios.post(`${URL_API}/upload-pic/`, 
        data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            },
          }
        )
        .then(res => {
            this.setState({ images: res.data})
            console.log(res.data)
            this.fectDataUser()

          })
          .catch(err => {
            console.log(err)
          })
    }

    deletePic = () => {
        let token = localStorage.getItem("token")
        Axios.post(`${URL_API}/delete-pic/`,
        {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        .then(res => {
            // console.log("dataget", res.data[0].profile_picture)
            this.setState({dataUser: res.data})
            this.setState({images : res.data[0].profile_picture})
        })
        .catch(err => {
            console.log("error get", err)
        })
    }

    // input
    renderTInput = () => {
        return (
          <tfoot>
            <tr>
              <td><Form.Control ref="addressadd" type="text" placeholder="Enter Address " /></td>
              <td><Form.Control ref="kecamatanadd" type="text" placeholder="Enter Kecamatan " /></td>
              <td><Form.Control ref="kabupatenadd" type="text" placeholder="Enter Kabupaten " /></td>
              {/* <td><Form.Control ref="status_aktifadd" type="text" placeholder="Enter Status " /></td> */}
              <td>
                <Form.Select ref="status_aktifadd" type="text"  size="md" placeholder="Choose">
                <option>Aktif</option>
                 <option>Tidak Aktif</option>

                </Form.Select>  
            </td>
              <td><Button variant="outline-success" onClick={this.onAddAddress}>Add</Button></td>
            </tr>
          </tfoot>
        )
      }
    // input
    render(){
        // console.log(this.state.datauser.map(item => { console.log(item.username) }))
        const { successUpdate, warningvisible, warning, images} = this.state
        // console.log(this.state.datauser[0].profile_picture)
        // console.log(this.setState.datauser[0].profile_picture)
        // console.log(images)
        return(
            <div>
                <NavigationBar/>
                <Container>
                        <Row style={styles.cont}>
                        <Col sm={3}>
                            <div style={styles.imgProfile}>
                                
                                <Image rounded   src={images ? `http://localhost:2000/${images}` : `http://localhost:2000/asset/default.png` } 
                                style={{
                                        height: '100%',
                                        width: '100%',
                                        backgroundPosition: 'center',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        display : 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>  
                                    
                                </Image> 
                                <div style={{ marginTop: '1vh' }}>  
                                    <form encType="multipart/form-data">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="IMG"
                                        onChange={(e) => this.handleChoose(e)}
                                    />
                                    </form>
                                        <div style={styles.uploadButton}> 
                                            <Button onClick={this.handleUpload} >Upload</Button>
                                            <Button onClick={this.deletePic} >Delete</Button>
                                        </div>       
                                    </div>
                            </div>
                        </Col>
                        <Col sm={9}>                        
                            <div style={styles.dataProfile}>

                                    <Tabs defaultActiveKey="Profile" id="uncontrolled-tab-example" className="mb-3">
                                    {this.state.datauser.map(item => {
                                        return(   
                                            <Tab eventKey="Profile" title="Profile">      
                                             {successUpdate ? <Alert variant="success">Data Berhasil Disimpan</Alert> : null }
                                             {warningvisible ? <Alert variant="danger">{warning}</Alert> : null }

                                            <Form.Group className="mb-3" >
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control ref="usernameEdit" type="text" defaultValue={item.username} placeholder="Enter Username"  />
                                            
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Full Name</Form.Label>
                                                <Form.Control ref="fullnameEdit" type="text" defaultValue={item.full_name} placeholder="Enter Fullname" />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control ref="emailEdit" type="text" defaultValue={item.email} placeholder="Enter Email"/>
                                                
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
                                                    <th>Address</th>
                                                    <th>Kecamatan</th>
                                                    <th>Kabupaten</th>
                                                    <th>Status</th>

                                                    <th>Action</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.dataaddress.map((item, index) => {
                                                    if(this.state.idEdit === item.id_address){
                                                         return(
                                                            <tr key={index}>
                                                            <td>
                                                                <Form.Group className="mb-3">
                                                                <Form.Control ref= "addressEdit" type="text" defaultValue={item.address} placeholder="Enter Address" />
                                                                </Form.Group></td>
                                                            <td>
                                                                <Form.Group className="mb-3">
                                                                <Form.Control ref= "kecamatanEdit" type="text" defaultValue={item.kecamatan} placeholder="Enter Kecamatan" />
                                                                </Form.Group>
                                                            </td>
                                                            <td>
                                                                <Form.Group className="mb-3">
                                                                <Form.Control ref= "kabupatenEdit" type="text" defaultValue={item.kabupaten} placeholder="Enter Kabupaten" />
                                                                </Form.Group>
                                                            </td>
                                                            <td>
                                                                <Form.Group className="mb-3">
                                                                {/* <Form.Control ref= "kabupatenEdit" type="text" defaultValue={item.status_aktif} placeholder="Enter Status" /> */}
                                                                    <Form.Select ref="status_aktifadd" type="text"  defaultValue={item.status_aktif} size="md" placeholder="Choose">
                                                                    <option>Aktif</option>
                                                                    <option>Tidak Aktif</option>
                                                                    </Form.Select>  
                                                                </Form.Group>
                                                            </td>
                                                            <td>
                                                                <Button variant="outline-success" onClick={() => this.onEditAddress(item.id_address)}>Save</Button>
                                                                <Button variant="outline-danger" onClick={() => this.setState({ idEdit: null })}>Cancel</Button>
                                                                <Button variant="outline-danger" onClick={() => this.onDeleteAddress(item.id_address)}>Delete</Button>

                                                            </td>
                                                        </tr>
                                                        )
                                                    }return (
                                                        <tr key={index}>
                                                        <td>{item.address}</td>
                                                        <td>{item.kecamatan}</td>
                                                        <td>{item.kabupaten}</td>
                                                        <td>{item.status_aktif}</td>

                                                        <td>
                                                            <Button variant="outline-warning" onClick={() => this.setState({ idEdit: item.id_address })}>Edit</Button>
                                                        </td>
                                                        </tr>
                                                    )

                                                })}

                                            </tbody> 
                                            {this.renderTInput()}

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



export default ProfilePage;

const styles= {
    cont:{
        margin:'10vh -2vh'
    },
    imgProfile: {
        // border : '1px solid black',
        // borderRadius: '2%',

    },
    uploadButton:{
        marginTop: '2vh',
        display : 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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