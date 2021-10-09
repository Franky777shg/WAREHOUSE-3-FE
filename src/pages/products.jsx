import React from "react"
import Axios from "axios"

import { Button, Card, Stack, Pagination, Row, Col, Form, Alert } from "react-bootstrap"
import NavigationBar from "../components/NavigationBar"

class ProductPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProd: [],
            currentPage: 1,
            pageNext: "",
            pagePrev: "",
            total_page: null,
            notFound: false

        }
    }

    //fetch data
    componentDidMount() {
        Axios.post(`http://localhost:2000/product/get-product/`)
            .then(res => {
                this.setState({
                    dataProd: res.data[0],
                    total_page: (Math.ceil(res.data[3].totalItems / res.data[2].per_page))
                })
                // console.log(Math.ceil(res.data[3].totalItems / res.data[2].per_page))
            })
            .catch(err => {
                console.log("Error API", err)
            })
    }

    searchFilter = () => {
        let name = this.refs.name.value
        let category = this.refs.category.value

        let obj = {
            name,
            category
        }
        console.log (obj)
        // console.log("FilterClick", this.state.currentPage + 1)

        if (this.refs.name.value == null && this.ref.category.value == null) {
            return (null)
        } else {
            Axios.post(`http://localhost:2000/product/filter-product?page=${this.state.currentPage}`, obj)
                .then(res => {
                    this.setState({
                        dataProd: res.data[0],
                        total_page: (Math.ceil(res.data[3].totalItems / res.data[2].per_page)),
                        currentPage: 1,
                        pageNext: "onFilter",
                        pagePrev: "onFilter"

                    })
                })
        }


    }

    onNext = () => {
        if (this.state.pageNext === "") { //paginate biasa
            Axios.post(`http://localhost:2000/product/get-product?page=${this.state.currentPage + 1}`)
                .then(res => {
                    this.setState({
                        dataProd: res.data[0],
                        total_page: (Math.ceil(res.data[3].totalItems / res.data[2].per_page)),
                        currentPage: this.state.currentPage + 1

                    })
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (this.state.pageNext === "onFilter") { //paginate hasil filter
            let name = this.refs.name.value
            let category = this.refs.category.value

            let obj = { name, category }

            Axios.post(`http://localhost:2000/product/filter-product?page=${this.state.currentPage + 1}`, obj)
                .then(res => {
                    this.setState({
                        dataProd: res.data[0],
                        total_page: (Math.ceil(res.data[3].totalItems / res.data[2].per_page)),
                        currentPage: this.state.currentPage + 1
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            // if (this.statedataProd.length === 0) {
            //     this.setState({ notFound : true })
            // } else { this.setState({ notFound: false})}
        }
    }

    onPrevious = () => {
        if (this.state.pagePrev === "") { //paginate biasa
            Axios.post(`http://localhost:2000/product/get-product?page=${this.state.currentPage - 1}`)
                .then(res => {
                    this.setState({
                        dataProd: res.data[0],
                        total_page: (Math.ceil(res.data[3].totalItems / res.data[2].per_page)),
                        currentPage: this.state.currentPage - 1

                    })
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (this.state.pagePrev === "onFilter") { //paginate hasil filter
            let name = this.refs.name.value
            let category = this.refs.category.value

            let obj = { name, category }

            Axios.post(`http://localhost:2000/product/filter-product?page=${this.state.currentPage - 1}`, obj)
                .then(res => {
                    this.setState({
                        dataProd: res.data[0],
                        total_page: (Math.ceil(res.data[3].totalItems / res.data[2].per_page)),
                        currentPage: this.state.currentPage - 1
                    })

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }


    render() {
        const { dataProd, total_page } = this.state
        console.log(dataProd)
        return (
            <div>
                <NavigationBar />
                <div style={{ backgroundColor: 'rgba(225, 233, 185, 0.8)' }}>
                    <div className="Filter" style={{ margin: '5%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: '60px 0 30px' }}>
                        <Row className="g-2" style={{ margin: '20px', width: '60vw' }}>
                            <Col md>
                                {/* <p style={{ margin: '5px' }}>Filter search :</p> */}
                            </Col>
                            <Col md>
                                <Form.Control type="text" placeholder="Product Name" style={{ width: '25vw' }} ref="name"  />
                            </Col>
                            <Col md>
                                <Form.Select aria-label="Floating label select example" style={{ width: '15vw' }} ref="category">
                                    <option value="">Categories</option>
                                    <option value="Tables & Desks">Tables & Desks</option>
                                    <option value="Sofas">Sofas</option>
                                    <option value="Bed">Bed</option>
                                    <option value="Kitchens">Kitchens</option>
                                    <option value="Storages">Storages</option>
                                    <option value="Bathroom">Bathroom</option>
                                </Form.Select>
                            </Col>
                            <Col md>
                                <Button variant="primary" onClick={() => this.searchFilter()}>Filter</Button>
                            </Col>
                        </Row>

                    </div>
                    <div className="cardWrapper">
                        <div class="show-product" style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', flexWrap: 'wrap', marginTop: '1%', justifyContent: 'center' }}>
                            {dataProd.map((item, index) => {
                                return (
                                    <Card style={{ width: '100%', margin: '2%', flexBasis: "33%" }} key={index}>
                                        <Card.Img variant="top" src={`http://localhost:2000/products/${item.productimg}`} />
                                        <Card.Body>
                                            <Card.Title>{item.product_name}</Card.Title>
                                            <Card.Text>
                                                {item.product_description}
                                            </Card.Text>
                                            <Button variant="success" style={{ margin: "20px 10px" }}>
                                                <i class="fas fa-shopping-cart" style={{ marginRight: '10px' }}></i>
                                                Buy
                                            </Button>
                                            <Button variant="outline-danger" style={{ margin: "20px 10px" }}>
                                                <i class="far fa-heart" style={{ marginRight: '10px' }}></i>
                                                Wishlist
                                            </Button>
                                            <Button variant="outline-info" style={{ margin: "20px 10px" }}>
                                                <i class="fas fa-info" style={{ marginRight: '10px' }}></i>
                                                Get Detail
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                )
                            })}

                        </div>
                    </div>
                    <div>
                        <Stack direction="horizontal" gap={3} style={{ justifyContent: 'center' }}>
                            {/* <Button tittle="Previous" variant="outline-primary" gap={3} onClick={() => onPrevious()}>Prev</Button>
                            <Button tiitle="Next" variant="outline-primary" gap={3} onClick={() => onNext()}>Next</Button> */}
                            <Pagination >
                                <Pagination.Prev disabled={this.state.currentPage === 1 ? true : false} onClick={() => this.onPrevious()} />
                                <Pagination.Item disabled>{this.state.currentPage}</Pagination.Item>
                                <Pagination.Item disabled>/</Pagination.Item>
                                <Pagination.Item disabled>{total_page}</Pagination.Item>
                                <Pagination.Next disabled={this.state.currentPage === this.state.total_page || this.state.total_page === 0 ? true : false} onClick={() => this.onNext()} />
                            </Pagination>
                        </Stack>

                    </div>
                </div>
            </div>
        )
    }
}

export default ProductPage