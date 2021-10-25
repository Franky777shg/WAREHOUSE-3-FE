import React from 'react'
import Axios from "axios"
import NavigationBar from '../../components/__admin/NavigationBar'
import { Button, Card, Stack, Pagination, Modal, Row, Col, Form } from "react-bootstrap"
import { Link, Redirect } from "react-router-dom"

import { connect } from "react-redux";
import { keepAdminLogin } from "../../redux/actions";


class ProductAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            prodAdmin: [],
            total_pageAdmin: null,
            currentPageAdmin: 1,
            nameProd: "",
            modalDel: false,
            idProd: 0,
            modalSuccess: [false, ""],
            pageNext: "",
            pagePrev: "",
            isLoading: false

        }
    }

    componentDidMount() {
        Axios.post(`http://localhost:2000/prod-admin/get-product-admin`)
            .then(res => {
                console.log('Data Asli', res.data)
                this.setState({
                    prodAdmin: res.data[0],
                    total_pageAdmin: (Math.ceil(res.data[3].totalItemAdmin / res.data[2].per_page)),

                })
            })
            .catch(err => {
                console.log('Error API', err)
            })
    }

    searchFilter = () => {
        let name = this.refs.name.value
        let category = this.refs.category.value

        this.setState({ isLoading: true })
        let obj = {
            name,
            category
        }
        console.log(obj)

        if (this.refs.name.value == null && this.ref.category.value == null) {
            return (null)
        } else {
            Axios.post(`http://localhost:2000/prod-admin/filter-product?page=${this.state.currentPageAdmin}`, obj)
                .then(res => {
                    this.setState({
                        prodAdmin: res.data[0],
                        total_pageAdmin: (Math.ceil(res.data[3].totalItemAdmin / res.data[2].per_page)),
                        currentPageAdmin: 1,
                        pageNext: "onFilter",
                        pagePrev: "onFilter",
                        isLoading: false
                    })
                })
                .catch(err => console.log(err))
        }
    }

    onSorting = () => {
        let name = this.refs.name.value
        let category = this.refs.category.value
        let sort = this.refs.sort.value
        this.setState({ isLoading: true })
        let obj

        if (sort == "name-asc") {
            console.log("klik sort name-asc")
            obj = { name, category, orderBy: "product_name", sortBy: "asc" }
        } else if (sort === "name-desc") {
            console.log("klik sort name-desc")
            obj = { name, category, orderBy: "product_name", sortBy: "desc" }
        } else if (sort === "price-asc") {
            console.log("klik sort price-asc")
            obj = { name, category, orderBy: "product_price", sortBy: "asc" }
        } else if (sort === "price-desc") {
            console.log("klik sort price-desc")
            obj = { name, category, orderBy: "product_price", sortBy: "desc" }
        } else {
            return
        } console.log("Hasil klik Sort", obj)

        Axios.post(`http://localhost:2000/prod-admin/sort-product?page=${this.state.currentPageAdmin}`, obj)
            .then(res => {
                this.setState({
                    prodAdmin: res.data[0],
                    total_pageAdmin: (Math.ceil(res.data[3].totalItemAdmin / res.data[2].per_page)),
                    currentPageAdmin: 1,
                    pageNext: "onSort",
                    pagePrev: "onSort",
                    isLoading: false
                })
            })
            .catch(err => console.log(err))
    }

    onDelModal = (idProd, nameProd) => {
        // console.log(idProd, nameProd)
        this.setState({
            idProd: idProd,
            nameProd: nameProd,
            modalDel: true
        })
    }

    onDelProd = () => {
        // let obj = {
        //     id: this.state.idProd,
        //     name: this.state.nameProd,
        //     page: this.state.currentPageAdmin
        // }
        // console.log("obj-del",obj)
        Axios.get(`http://localhost:2000/prod-admin/delete-product/${this.state.idProd}/${this.state.currentPageAdmin}/${this.state.nameProd}`)
            .then((res) => {
                console.log("res-del", res.data)
                this.setState({
                    prodAdmin: res.data[0],
                    total_pageAdmin: (Math.ceil(res.data[3].totalItemAdmin / res.data[2].per_page)),
                    modalSuccess: [true, res.data[4].message]
                })
                Axios.post(`http://localhost:2000/prod-admin/delete-stock/${this.state.idProd}`)
                    .then((res) => {
                        console.log("delete stock this product")
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
        this.setState({ modalDel: false })
    }

    onNextPage = () => {
        if (this.state.pageNext === "") {
            Axios.post(`http://localhost:2000/prod-admin/get-product-admin?page=${this.state.currentPageAdmin + 1}`)
                .then(res => {
                    this.setState({
                        prodAdmin: res.data[0],
                        total_pageAdmin: (Math.ceil(res.data[3].totalItemAdmin / res.data[2].per_page)),
                        currentPageAdmin: this.state.currentPageAdmin + 1
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (this.state.pageNext === "onFilter") {
            let name = this.refs.name.value
            let category = this.refs.category.value

            let obj = { name, category }

            Axios.post(`http://localhost:2000/prod-admin/filter-product?page=${this.state.currentPageAdmin + 1}`, obj)
                .then(res => {
                    this.setState({
                        prodAdmin: res.data[0],
                        total_pageAdmin: (Math.ceil(res.data[3].totalItemAdmin / res.data[2].per_page)),
                        currentPageAdmin: this.state.currentPageAdmin + 1
                    })
                })
        } else if (this.state.pageNext === "onSort") {
            let name = this.refs.name.value
            let category = this.refs.category.value
            let sort = this.refs.sort.value
            let obj

            if (sort == "name-asc") {
                console.log("klik sort name-asc")
                obj = { name, category, orderBy: "product_name", sortBy: "asc" }
            } else if (sort === "name-desc") {
                console.log("klik sort name-desc")
                obj = { name, category, orderBy: "product_name", sortBy: "desc" }
            } else if (sort === "price-asc") {
                console.log("klik sort price-asc")
                obj = { name, category, orderBy: "product_price", sortBy: "asc" }
            } else if (sort === "price-desc") {
                console.log("klik sort price-desc")
                obj = { name, category, orderBy: "product_price", sortBy: "desc" }
            } else {
                return
            } console.log("Hasil klik Sort", obj)

            Axios.post(`http://localhost:2000/prod-admin/sort-product?page=${this.state.currentPageAdmin}`, obj)
                .then(res => {
                    this.setState({
                        prodAdmin: res.data[0],
                        total_pageAdmin: (Math.ceil(res.data[3].totalItemAdmin / res.data[2].per_page)),
                        currentPageAdmin: 1,
                        pageNext: "onSort",
                        pagePrev: "onSort"

                    })
                })
                .catch(err => console.log(err))
        }

    }

    onPrevPage = () => {
        if (this.state.pagePrev === "") {
            Axios.post(`http://localhost:2000/prod-admin/get-product-admin?page=${this.state.currentPageAdmin - 1}`)
                .then(res => {
                    this.setState({
                        prodAdmin: res.data[0],
                        total_pageAdmin: (Math.ceil(res.data[3].totalItemAdmin / res.data[2].per_page)),
                        currentPageAdmin: this.state.currentPageAdmin - 1
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (this.state.pagePrev === "onFilter") {
            let name = this.refs.name.value
            let category = this.refs.category.value

            let obj = { name, category }

            Axios.post(`http://localhost:2000/prod-admin/filter-product?page=${this.state.currentPageAdmin - 1}`, obj)
                .then(res => {
                    this.setState({
                        prodAdmin: res.data[0],
                        total_pageAdmin: (Math.ceil(res.data[3].totalItemAdmin / res.data[2].per_page)),
                        currentPageAdmin: this.state.currentPageAdmin - 1
                    })
                })
                .catch(err => console.log(err))
        } else if (this.state.pagePrev === "onSort") {
            let name = this.refs.name.value
            let category = this.refs.category.value
            let sort = this.refs.sort.value
            let obj

            if (sort == "name-asc") {
                console.log("klik sort name-asc")
                obj = { name, category, orderBy: "product_name", sortBy: "asc" }
            } else if (sort === "name-desc") {
                console.log("klik sort name-desc")
                obj = { name, category, orderBy: "product_name", sortBy: "desc" }
            } else if (sort === "price-asc") {
                console.log("klik sort price-asc")
                obj = { name, category, orderBy: "product_price", sortBy: "asc" }
            } else if (sort === "price-desc") {
                console.log("klik sort price-desc")
                obj = { name, category, orderBy: "product_price", sortBy: "desc" }
            } else {
                return
            } console.log("Hasil klik Sort", obj)

            Axios.post(`http://localhost:2000/prod-admin/sort-product?page=${this.state.currentPageAdmin}`, obj)
                .then(res => {
                    this.setState({
                        prodAdmin: res.data[0],
                        total_pageAdmin: (Math.ceil(res.data[3].totalItemAdmin / res.data[2].per_page)),
                        currentPageAdmin: 1,
                        pageNext: "onSort",
                        pagePrev: "onSort"
                    })
                })
                .catch(err => console.log(err))
        }

    }

    render() {
        // console.log(this.state.nameProd)
        // console.log("pagenow",this.state.currentPageAdmin)
        // if(this.)
        const { prodAdmin, total_pageAdmin } = this.state
        if (localStorage.getItem("admin_token")) {
            this.props.keepAdminLogin();
        }
        if (!this.props.adminUsername) {
            return <Redirect to="/auth/admin/login" />;
        }

        return (
            <div>
                <NavigationBar />
                <div style={{ backgroundColor: 'rgba(230, 201, 137, 0.5)' }}>
                    <div style={{ marginTop: '10px', margin: '0%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: '0px 0 10px 0' }}>
                        <Row md={7} className="g-2" style={{ width: '80vw', marginTop: '1%' }}>
                            <Col >
                                {this.state.isLoading && <p> Loading... </p>}
                            </Col>
                            <Col >
                                <Form.Control
                                    type="text"
                                    placeholder="Product Name"
                                    style={{ width: '20vw' }}
                                    ref="name" />
                            </Col>
                            <Col>
                                <Form.Select aria-label="Floating label select example" style={{ width: '15vw' }} ref="category">
                                    <option value="">Categories</option>
                                    <option value="Tables & Desks">Tables & Desks</option>
                                    <option value="Sofa">Sofa</option>
                                    <option value="Bed">Bed</option>
                                    <option value="Kitchens">Kitchens</option>
                                    <option value="Storages">Storages</option>
                                    <option value="Bathroom">Bathroom</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Button variant="outline-success" onClick={() => this.searchFilter()}>Filter</Button>
                            </Col>
                            <Col>
                                <Form.Select aria-label="Floating label select example" style={{ width: '10vw' }} ref="sort" >
                                    <option value="">Sort By</option>
                                    <option value="name-asc" >name asc</option>
                                    <option value="name-desc">name desc</option>
                                    <option value="price-asc">price asc</option>
                                    <option value="price-desc">price desc</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Button variant="outline-success" onClick={()=>this.onSorting()}>Sort</Button>
                            </Col>
                            <Col>
                                <Button variant="success" as={Link} to={`/admin/add-product`}>Add Product</Button>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ backgroundImage: 'linear-gradient(to right, #a8edea, #fed6e3)' }}>

                        <div className="cardWrapper">
                            <div class="show-product" style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', flexWrap: 'wrap', marginTop: '1%', justifyContent: 'center' }}>
                                {prodAdmin.map((item, index) => {
                                    return (
                                        <Card text="dark" bg="light" style={{ width: '100%', margin: '2%', flexBasis: "33%" }} key={index} >
                                            <Card.Img variant="top" src={`http://localhost:2000/products/${item.productimg}`} />
                                            <Card.Body>
                                                <Card.Title>{item.product_name}</Card.Title>
                                                <Card.Text>
                                                    Price : {item.product_price.toLocaleString('id', { style: 'currency', currency: 'IDR' })}
                                                </Card.Text>
                                                {/* <Button variant="success" style={{ margin: "20px 10px" }}>
                                                <i class="fas fa-shopping-cart" style={{ marginRight: '10px' }}></i>
                                                Buy
                                            </Button> */}
                                                {/* <Button variant="outline-danger" style={{ margin: "20px 10px" }}>
                                                <i class="far fa-heart" style={{ marginRight: '10px' }}></i>
                                                Wishlist
                                            </Button> */}
                                                <Button variant="outline-info" style={{ margin: "20px 10px" }}
                                                    as={Link} to={`/admin/product-admin-edit/${item.id_product}`}>
                                                    <i class="fas fa-info" style={{ marginRight: '10px' }}></i>
                                                    Edit This Product
                                                </Button>
                                                <Button variant="outline-danger" style={{ margin: "20px 10px" }} onClick={() => { this.onDelModal(item.id_product, item.product_name) }}>
                                                    <i class="far fa-trash-alt" style={{ marginRight: '5px' }}></i>
                                                    Delete Product
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    )
                                })}

                            </div>
                        </div>
                        <div>
                            <Stack direction="horizontal" gap={3} style={{ justifyContent: 'center', position: 'relative' }}>
                                <Pagination >
                                    <Pagination.Prev disabled={this.state.currentPageAdmin === 1 ? true : false} onClick={() => this.onPrevPage()} />
                                    <Pagination.Item disabled >{this.state.currentPageAdmin}</Pagination.Item>
                                    <Pagination.Item disabled >/</Pagination.Item>
                                    <Pagination.Item disabled>{total_pageAdmin}</Pagination.Item>
                                    <Pagination.Next disabled={this.state.currentPageAdmin === this.state.total_pageAdmin || this.state.total_pageAdmin === 0 ? true : false} onClick={() => this.onNextPage()} />
                                </Pagination>
                            </Stack>

                        </div>
                    </div>

                    <Modal show={this.state.modalDel}
                        onHide={() => this.setState({ modalDel: false })}
                        backdrop="static"
                        keyboard={false}
                        centered
                    >
                        <Modal.Header>
                            <Modal.Title>
                                Delete Product
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure to delete product {this.state.nameProd} ?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={this.onDelProd}>
                                Confirm
                            </Button>
                            <Button variant="outline-danger" onClick={() => this.state({ modalDel: false })}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.modalSuccess[0]}
                        backdrop="static"
                        keyboard={false}
                        centered
                    >
                        <Modal.Header>
                            <Modal.Title>Delete Success</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{this.state.modalSuccess[1]}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="success"
                                onClick={() => this.setState({ modalSuccess: [false, ""] })}
                                as={Link} to={`/admin/product-admin`}>
                                OK
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        adminUsername: state.adminReducer.adminUsername,
    };
};

export default connect(mapStateToProps, { keepAdminLogin })(ProductAdmin);
// export default ProductAdmin