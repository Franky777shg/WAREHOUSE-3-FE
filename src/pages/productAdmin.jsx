import React from 'react'
import Axios from "axios"
import NavigationBar from '../components/NavigationBar'
import { Button, Card, Stack, Pagination} from "react-bootstrap"
// import NavigationBar from "../components/NavigationBar"
import { Link } from "react-router-dom"

class ProductAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            prodAdmin: [],
            total_pageAdmin: null,
            currentPageAdmin: 1

        }
    }

    componentDidMount() {
        Axios.post(`http://localhost:2000/prod-admin/get-product-admin`)
        .then(res => {
            console.log('Data Asli', res.data)
            this.setState({
                prodAdmin: res.data[0],
                total_pageAdmin: (Math.ceil(res.data[3].totalItemAdmin / res.data[2].per_page))
            })
        })
        .catch(err => {
            console.log('Error API', err)
        })
    }

    onNextPage = () => {
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
    }

    onPrevPage = () => {
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
    }
    render() {
        const {prodAdmin, total_pageAdmin} = this.state
        return(
            <div>
                <NavigationBar/>
                <div style={{marginTop: '60px'}}>
                    Space untuk Filter product
                </div>
                <div style={{ backgroundImage: 'linear-gradient(to right, #a8edea, #fed6e3)' }}>

                    <div className="cardWrapper">
                        <div class="show-product" style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', flexWrap: 'wrap', marginTop: '2%', justifyContent: 'center' }}>
                            {prodAdmin.map((item, index) => {
                                return (
                                    <Card text="dark" bg="light" style={{ width: '100%', margin: '2%', flexBasis: "33%" }} key={index} >
                                        <Card.Img variant="top" src={`http://localhost:2000/products/${item.productimg}`}/>
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
                                        </Card.Body>
                                    </Card>
                                )
                            })}
                                    
                        </div>
                    </div>
                    <div>
                        <Stack direction="horizontal" gap={3} style={{ justifyContent: 'center', position: 'relative' }}>
                            <Pagination >
                                <Pagination.Prev disabled={this.state.currentPageAdmin === 1 ? true : false} onClick={()=>this.onPrevPage()}/>
                                    <Pagination.Item disabled >{this.state.currentPageAdmin}</Pagination.Item>
                                    <Pagination.Item disabled >/</Pagination.Item>
                                    <Pagination.Item disabled>{total_pageAdmin}</Pagination.Item>
                                <Pagination.Next disabled={this.state.currentPageAdmin === this.state.total_pageAdmin || this.state.total_pageAdmin === 0 ? true : false} onClick={() =>this.onNextPage()}/>
                            </Pagination>
                        </Stack>

                    </div>
                </div>
            </div>
        )
    }
}

export default ProductAdmin