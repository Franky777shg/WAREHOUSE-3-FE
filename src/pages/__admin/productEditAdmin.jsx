import React from 'react'
import Axios from 'axios'
import { Image, Button, Modal, Form, Row, Col, Alert } from 'react-bootstrap'
import NavigationBar from '../../components/__admin/NavigationBar'
import { Link, Redirect } from 'react-router-dom'
import { findAllByDisplayValue } from '@testing-library/dom'

class ProdAdminEditPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            prodDetail: {},
            cate: [],
            cateOption: "",
            stockWH: [],
            stockOp: [],
            stockModal: false,
            updStock: null,
            inputEmpty: [false, ""],
            images: '',
            uploadModalPhoto: false,
            successModalChanges: [false, ""],
            successPhoto: false,
            maxStockOp: null
        }
    }

    fetchData = () => {
        let idProd = this.props.match.params.id
        window.scrollTo(0, 0)
        Axios.get(`http://localhost:2000/prod-admin/get-product-admin-detail/${idProd}`)
            .then((res) => {
                console.log("Detail prodID",res.data)
                this.setState({
                    prodDetail: res.data[0],
                    cateOption: res.data[0].id_categories,
                    maxStockOp: res.data[0].TotalStockOperational
                })

                Axios.get(`http://localhost:2000/prod-admin/get-categories`)
                    .then((res) => {
                        //    console.log("Categories",res.data)
                        this.setState({
                            cate: res.data
                        })
                        Axios.get(`http://localhost:2000/prod-admin/get-detail-stock-op/${idProd}`)
                            .then((res) => {
                                //    console.log("GetStock", res.data)
                                this.setState({
                                    stockWH: res.data
                                })
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.fetchData()
    }

    onUpdateStock = (index) => {

        let idProdStock = this.props.match.params.id
        // let stockOp = this.refs.ProductStockOp.value
        let stockOp = +this.state.stockOp[index].value

        let idx = index + 1

        let obj = {
            stockOp,
            idx
        }
        // console.log("id",idProdStock)

        Axios.post(`http://localhost:2000/prod-admin/edit-stock/${idProdStock}`, obj)
            .then(res => {
                // console.log(res.data)
                this.setState({
                    stockModal: true,
                    updStock: stockOp
                })
                this.fetchData()
            })
            .catch(err => console.log(err))

    }

    onSaveChanges = () => {
        let product_name = this.refs.ProductName.value
        let id_categories = +this.state.cateOption
        let product_price = +this.refs.ProductPrice.value
        let product_description = this.refs.ProductDesc.value

        if (!product_name || !id_categories || !product_price || !product_description) return this.setState({ inputEmpty: [true, "Cannot be empty, Please input all of data !"] })

        else {
            let updData = {
                product_name,
                id_categories,
                product_price,
                product_description
            }
            console.log(updData)

            Axios.post(`http://localhost:2000/prod-admin/edit-product/${this.state.prodDetail.id_product}/`, updData)
                .then(res => {
                    // console.log("Data Save", res.data)
                    this.setState({
                        prodDetail: res.data[0],
                        cateOption: res.data[0].id_categories,
                        successModalChanges: [true, "Product detail sucessfully changed"]
                    })
                })
                .catch(err => console.log(err))
        }

    }

    handleChoose = (e) => {
        this.setState({ images: e.target.files[0] })
        // console.log("target", e.target.files[0])
    }

    handleUpload = () => {
        const data = new FormData()
        data.append('PROD', this.state.images)
        // console.log(data.get('PROD'))
        let idProd = this.props.match.params.id

        Axios.post(`http://localhost:2000/prod-admin/edit-detailfoto/${idProd}`, data, { headers: { 'Content-type': 'multipart/form-data' } })
            .then(res => {
                // console.log("Upload", res.data)
                this.setState({
                    prodDetail: res.data[0],
                    cateOption: res.data[0].id_categories,
                    successPhoto: res.data[1].success,
                    uploadModalPhoto: false
                })
            })
            .catch(err => console.log(err))
    }




    render() {
        // console.log("Cate",this.state.cate)
        // console.log("prod", this.state.prodDetail) 
        // console.log("opt",this.state.cateOption)
        // console.log("IMG",this.state.images)
        // console.log("Stock All WH", this.state.stockWH)
        // console.log("OP",this.state.maxStockOp)

        // if(this.state.successModalChanges===true)

        return (
            <div style={{ backgroundColor: "rgba(189, 195, 199, 1)", height: '100vh', paddingTop: '5vh' }}>
                <NavigationBar />
                <div style={styles.contTitle} >
                    <h1>Edit Product Page</h1>
                </div>
                <div className="d-flex flex-wrap  bd-highlight mb-3 justify-content-center">
                    <div className="d-flex flex-column">
                        <Image className="me-3 mb-2" width={360} height={400}
                            src={`http://localhost:2000/products/${this.state.prodDetail.productimg}`}
                        />
                        <Button style={styles.btnUpload}
                            variant="outline-dark"
                            onClick={() => this.setState({ uploadModalPhoto: true })}
                        >Change Photo</Button>
                    </div>
                    <div style={styles.contDesc}>
                        <Form>
                            <Form.Group className="mb-1">
                                <Form.Label>Product Name :</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={this.state.prodDetail.product_name}
                                    ref="ProductName"
                                />
                            </Form.Group>

                            <Row className="mb-1">
                                <Form.Group as={Col}>
                                    <Form.Label>Categories :</Form.Label>
                                    <Form.Select onChange={(e)=>this.setState({cateOption: e.target.value})}>
                                        <option value={this.state.prodDetail.id_categories} >
                                            {this.state.prodDetail.category_name}
                                        </option>
                                        {this.state.cate.map((item) => {
                                            return <option value={item.id_categories}>{item.category_name}</option>
                                        })}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Price :</Form.Label>
                                    <Form.Control type="number"
                                        defaultValue={this.state.prodDetail.product_price}
                                        ref="ProductPrice"
                                    />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Product Description :</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    ref="ProductDesc"
                                    defaultValue={this.state.prodDetail.product_description}
                                />
                            </Form.Group>

                            <Form.Label>Total Stock Operational currently = <strong>{this.state.prodDetail.TotalStockOperational}</strong></Form.Label>
                            {this.state.stockWH.map((item, index) => {
                                return (
                                    <Row className="mb-3" key={index}>
                                        <Form.Group as={Col} >
                                            <Form.Label >{item.warehouse_name.slice(3)}</Form.Label>
                                        </Form.Group>

                                        <Form.Group as={Col} >
                                            <Form.Control
                                                type="number"
                                                defaultValue={item.stock_op}
                                                ref={ref => (this.state.stockOp[index] = ref)}
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Button onClick={() => this.onUpdateStock(index)}>Update {item.warehouse_name}</Button>
                                        </Form.Group>
                                    </Row>
                                )
                            })}

                            <Button style={{ marginTop: '2%' }} onClick={this.onSaveChanges}>Save All Changes</Button>
                        </Form>
                    </div>
                </div>

                <Modal show={this.state.uploadModalPhoto}
                    onHide={() => this.setState({ uploadModalPhoto: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Photo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form encType="multipart/form-data">
                            <input
                                type="file"
                                name="PROD"
                                accept="image/*"
                                onChange={(e) => this.handleChoose(e)}
                            />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='success' onClick={this.handleUpload}>
                            Save Changes
                        </Button>
                        <Button variant='dark' onClick={() => this.setState({ uploadModalPhoto: false })}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.stockModal} //Notif update stock
                    onHide={() => this.setState({ stockModal: false })}
                    backdrop="static"
                    keyboard={false}
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Stock Updated
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Successfully updated to {this.state.updStock}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({ stockModal: false })}>Close</Button>
                    </Modal.Footer>
                </Modal>

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

                <Modal show={this.state.successPhoto}>
                    <Modal.Header>
                        <Modal.Title>Photo Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Photo Successfully Updated</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.setState({ successPhoto: false })}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.successModalChanges[0]}
                    backdrop="static"
                    keyboard={false}
                    centered>
                    <Modal.Header>
                        <Modal.Title>Product Detail Updated</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.successModalChanges[1]}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success"
                            onClick={() => this.setState({ successModalChanges: [false, ""] })}
                            as={Link} to={`/admin/product-admin`}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div >
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

export default ProdAdminEditPage