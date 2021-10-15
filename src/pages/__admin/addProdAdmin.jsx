import React from 'react'
import Axios from 'axios'
import NavigationBar from '../../components/__admin/NavigationBar'
import { Image, Button, Form, Row, Col, Modal } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'

class AddProductAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cate: [],
            cateOption: "",
            id_product: "",
            images: "",
            inputEmpty: [false, ""],
            successAdd: [false, ""],
            prodAdd: {}
        }
    }

    componentDidMount() {
        this.fetchCate()
    }

    fetchCate = () => {
        Axios.get(`http://localhost:2000/prod-admin/get-categories`)
            .then((res => {
                this.setState({
                    cate: res.data
                })
            }))
            .catch((err) => { console.log(err) })
    }

    handleChoose = (e) => {
        this.setState({
            images: e.target.files[0]
        })
    }

    confirmAddProd = () => {
        let name = this.refs.ProductName.value
        let category = this.state.cateOption
        let description = this.refs.ProductDesc.value
        let price = +this.refs.ProductPrice.value

        const data = new FormData()
        data.append("PROD", this.state.images)
        console.log(data.get("PROD"))
        
        let obj = {
            name,
            category,
            description,
            price
        }
        console.log("obj", obj)

        

        if (!name || !category || !description || !price) {
            return this.setState({ inputEmpty: [true, "Cannot be empty, Please input all of data !"] })
        } else {
            Axios.post(`http://localhost:2000/prod-admin/add-product`, obj)
                .then((res) => {
                    console.log(res.data)
                    this.setState({ id_product: res.data.id_product })
                    Axios.post(`http://localhost:2000/prod-admin/edit-detailfoto/${this.state.id_product}`, data,
                        { headers: { 'Content-type': 'multipart/form-data' } })
                        .then((res) => {
                            this.setState({
                                successAdd: [true, "New Product Successfully added !"],
                            })
                        })
                        .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
        }
    }

    render() {
        // console.log(this.state.cate, "cate")
        // console.log("images",this.state.images)
        console.log("idprod", this.state.id_product)
        return (
            <div>
                <NavigationBar/>
                <div style={styles.contTitle} >
                    <h1>Add Product Admin</h1>
                </div>
                <div className="d-flex flex-wrap  bd-highlight mb-3 justify-content-center">
                    {/* <div className="d-flex flex-column">
                        <Image className="me-3 mb-2" width={360} height={400}/>
                        <Button style={styles.btnUpload}
                            variant="outline-dark"
                        >Add Photo</Button>
                    </div> */}
                    <div style={styles.contDesc}>
                        <Form>
                            <Row className="mb-1">
                                <Form.Group as={Col} className="mb-1">
                                    <Form.Label>Product Name :</Form.Label>
                                    <Form.Control
                                        type="text"
                                        ref="ProductName"
                                        placeholder="Input your new product name here"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} className="mb-1">
                                    <Form.Label>Product Images :</Form.Label>
                                    <form encType="multipart/form-data">
                                        <input
                                            type="file"
                                            name="PROD"
                                            accept="image/*"
                                            onChange={(e) => this.handleChoose(e)}
                                        />
                                    </form>
                                </Form.Group>
                            </Row>

                            <Row className="mb-1">
                                <Form.Group as={Col}>
                                    <Form.Label>Categories :</Form.Label>
                                    <Form.Select
                                        onChange={(e) => this.setState({ cateOption: e.target.value })}
                                    >
                                        <option >Choose Category Below</option>
                                        {this.state.cate.map((item, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={item.id_categories}
                                                >
                                                    {item.category_name}
                                                </option>
                                            )
                                        })}


                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Price :</Form.Label>
                                    <Form.Control
                                        type="number"
                                        ref="ProductPrice"
                                        placeholder="Input your product price here"
                                    />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Product Description :</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    ref="ProductDesc"
                                    placeholder="Input your product description here"
                                />
                            </Form.Group>
                            <Button style={{ marginTop: '2%' }} onClick={this.confirmAddProd}>Add Product</Button>
                        </Form>
                    </div>
                </div>

                <Modal show={this.state.inputEmpty[0]}>
                    <Modal.Header>
                        <Modal.Title>Error!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.inputEmpty[1]}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.setState({ inputEmpty: [false, ""] })}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.successAdd[0]}
                    backdrop="static"
                    keyboard={false}
                    centered>
                    <Modal.Header>
                        <Modal.Title>Product Detail Updated</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.successAdd[1]}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success"
                            onClick={() => this.setState({ successAdd: [false, ""] })}
                            as={Link} to={`/admin/product-admin`}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const styles = {
    contTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1%',
        height: '10vh',
        marginTop: '10px'
    },
    contImg: {
        backgroundImage: "linear-gradient(to right, #fda085, #f6d365)",
        flexBasis: '25%',
        borderRadius: '10px',
    },
    contDesc: {
        flexBasis: '50%',
        padding: '0 1% 0 1%',
    },
    img: {
        height: '80%',
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10%',

    },
    btnUpload: {
        width: '35%',
        margin: 'auto',
        marginTop: '3%'
    }
}

export default AddProductAdmin