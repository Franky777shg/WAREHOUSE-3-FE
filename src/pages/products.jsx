import React from "react"
import Axios from "axios"
import { connect } from "react-redux"
import { getAllProd } from "../redux/actions"
import { Link } from "react-router-dom"
import { Button, Card, Stack, Pagination } from "react-bootstrap"
import NavigationBar from "../components/NavigationBar"



class ProductPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProd: [],
            cur_page: "",
            per_page: "",
            total_item: "",
            counter: 1,
            totalPage: null
        }
    }

    componentDidMount() {
        Axios.get(`http://localhost:2000/product/get-product`)
            .then(res => {
                // console.log('Data API', res.data[0])
                // console.log('Data ASli', res.data)
                this.setState({
                    dataProd: res.data[0],
                    cur_page: res.data[1].current_page,
                    per_page: res.data[2].per_page,
                    total_item: res.data[3].totalItems,
                })
                this.props.getAllProd(this.props.pageActive)
            })
            .catch(err => {
                console.log('Error API', err)
            })

    }









    render() {

        const { dataProd, cur_page, per_page, total_item, counter } = this.state
        // console.log(dataProd, cur_page, per_page, total_item)
        console.log(this.props)

        const onPrevious = () => {
            Axios.get(`http://localhost:2000/product/get-product?page=${cur_page - 1}`)
                .then(res => {
                    this.setState({
                        dataProd: res.data[0],
                        cur_page: res.data[1].current_page,
                        per_page: res.data[2].per_page,
                        total_item: res.data[3].totalItems,
                        counter: cur_page - 1
                    })
                })
        }
        const onNext = () => {
            Axios.get(`http://localhost:2000/product/get-product?page=${cur_page + 1}`)
                .then(res => {
                    this.setState({
                        dataProd: res.data[0],
                        cur_page: res.data[1].current_page,
                        per_page: res.data[2].per_page,
                        total_item: res.data[3].totalItems,
                        counter: cur_page + 1
                    })
                })
        }

        const onPaginate = (goToPage) => {
            Axios.get(`http://localhost:2000/product/get-product?page=${goToPage}`)
                .then(res => {
                    this.setState({
                        dataProd: res.data[0],
                        cur_page: res.data[1].current_page,
                        per_page: res.data[2].per_page,
                        total_item: res.data[3].totalItems,
                        counter: this.props.pageActive
                    })
                    this.props.getAllProd(goToPage)
                })
        }


        const totalPages = Math.ceil(total_item / per_page)
        const contPages = []

        for (let i = 1; i <= totalPages; i++) {
            contPages.push(i)
        }
        // console.log(totalPages, contPages)

        return (
            <div>
                <NavigationBar />
                <div style={{ backgroundColor: 'rgba(225, 233, 185, 0.8)' }}>

                    <div className="cardWrapper">
                        <div class="show-product" style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', flexWrap: 'wrap', marginTop: '5%' }}>
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
                        <Stack direction="horizontal" gap={3}>
                            {/* <Button tittle="Previous" variant="outline-primary" gap={3} onClick={() => onPrevious()}>Prev</Button>
                            <Button tiitle="Next" variant="outline-primary" gap={3} onClick={() => onNext()}>Next</Button> */}
                            <Pagination counter={this.props.pageActive}>
                                <Pagination.Prev onClick={() => onPrevious()} />
                                {contPages.map(item => (
                                    <Pagination.Item key={item} active={counter === item} onclick={() => onPaginate()}>{item}</Pagination.Item>
                                ))}
                                <Pagination.Next onClick={() => onNext()} />
                            </Pagination>
                        </Stack>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.userReducer.product,
        prodPerPage: state.userReducer.prodPerPage,
        pageActive: state.userReducer.pageActive,
        totalProd: state.userReducer.totalProd,
        counterPage: state.userReducer.counterPage
    }
}

export default connect(mapStateToProps, { getAllProd })(ProductPage)