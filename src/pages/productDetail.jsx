import React from 'react'
import Axios from 'axios'
import { Image, Button, FormControl } from 'react-bootstrap'
import NavigationBar from '../components/NavigationBar'

class DetailPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            qty: 1,
            detailProd: null,
            maxStock: null
        }
    }

    componentDidMount() {
        let idProd = this.props.match.params.id
        // console.log(idProd)
        Axios.get(`http://localhost:2000/product/detail-product/${idProd}`)
            .then(res => {
                this.setState({
                    detailProd: res.data,
                    maxStock: res.data.TotalStockAvail
                })
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    onMinus = () => {
        this.setState({ qty: this.state.qty - 1 })
    }

    onPlus = () => {
        this.setState({ qty: this.state.qty + 1 })
    }

    onChangeQty = (e) => {
        let value = +e.target.value
        let maxQty = this.state.detailProd.TotalStockAvail

        if (value < 1) {
            this.setState({ qty: 1 })
        } else if (value > maxQty) {
            this.setState({ qty: maxQty })
        } else {
            this.setState({ qty: value })
        }
    }

    render() {
        const { qty, detailProd, maxStock } = this.state
        return (
            <div className="base" style={{ backgroundImage: "linear-gradient(to right, #fcb69f, #ffecd2)", height: '100vh', paddingTop: '8vh' }}>
                <NavigationBar />
                <div style={styles.contTitle}>
                    <h1>Product Detail</h1>
                </div>
                <div style={{ display: 'flex', marginLeft: '1%', marginRight: '1%' }}>
                    <div style={styles.contImg}>
                        <Image className="d-block"
                            src={detailProd ? `http://localhost:2000/products/${detailProd.productimg}` : ""}
                            fluid>
                        </Image>
                    </div>
                    <div style={styles.contDesc}>
                        <h1 style={{ border: '5px solid gray', borderRadius: '10px', padding: '1%' }}>{detailProd ? detailProd.product_name : ""}</h1>
                        <p><strong>Category : </strong>{detailProd ? detailProd.category_name : ""}</p>
                        <p><strong>Description : </strong>{detailProd ? detailProd.product_description : ""}</p>
                        <p><strong>Price : </strong>{detailProd ? detailProd.product_price.toLocaleString('id', { style: 'currency', currency: 'IDR' }) : ""} /item</p>
                        <p><strong>Stock : </strong>{detailProd ? detailProd.TotalStockAvail : ""}</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ marginBottom: '0' }}><strong>Quantity :</strong></p>
                            <div style={{ display: 'flex', width: '35%', justifyContent: 'space-between' }}>
                                <Button variant="outline-danger" disabled={qty ===1 ? true :false} style={{ marginLeft: '4%', marginRight: '4%' }} size="sm" onClick={this.onMinus}>
                                    <i className="fas fa-minus"></i>
                                </Button>
                                <FormControl
                                    style={{ width: '30%' }}
                                    value={qty}
                                    onChange={(e) => this.onChangeQty(e)}
                                />
                                <Button variant="outline-success" disabled={qty === maxStock ? true : false} style={{ marginLeft: '4%', marginRight: '4%' }} size="sm" onClick={this.onPlus}>
                                    <i className="fas fa-plus"></i>
                                </Button>
                                <Button variant="outline-dark" style={{ marginLeft: '3%', marginRight: '3%', width: '25%' }} size="sm">
                                    <i class="fas fa-cart-plus"> Add</i>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
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
        borderRadius: '10px'
    },
    contDesc: {
        flexBasis: '60%',
        padding: '0 1% 0 1%',
    },
    img: {
        height: '80%',
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10%',

    },
}

export default DetailPage