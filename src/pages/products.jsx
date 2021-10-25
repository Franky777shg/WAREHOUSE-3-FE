import React from "react";
import Axios from "axios";
import PageTitle from "../components/pageTitle";
import {
    Button,
    Card,
    Stack,
    Pagination,
    Row,
    Col,
    Form,
    ListGroup,
    Container,
    Badge,
} from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import { Link } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
const BASE_URL = "http://localhost:2000";

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProd: [],
            currentPage: 1,
            pageNext: "",
            pagePrev: "",
            total_page: null,
            notFound: false,
            isLoading: true,
            categories: [],
            selectedCategory: null,
        };
    }

    componentDidMount() {
        Axios.post(`http://localhost:2000/product/get-product/`)
            .then((res) => {
                this.setState({
                    dataProd: res.data[0],
                    total_page: Math.ceil(res.data[3].totalItems / res.data[2].per_page),
                });
                setTimeout(() => {
                    this.setState({ isLoading: false });
                }, 1000);
            })
            .catch((err) => {
                console.log("Error API", err);
            });

        this.getCategories();
    }

    getCategories() {
        Axios.get(`${BASE_URL}/product/get-categories/`)
            .then((res) => {
                this.setState({ categories: res.data });
                console.log(this.state.categories);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleChange(e) {
        this.setState({ selectedCategory: e.target.value });
        setTimeout(() => {
            console.log(this.state.selectedCategory);
        }, 1000);
    }

    searchFilter = () => {
        let name = this.refs.name.value;
        let category = this.refs.category.value;
        // let category = this.state.selectedCategory

        this.setState({ isLoading: true });
        let obj = {
            name,
            category,
        };
        console.log(obj);
        // console.log("FilterClick", this.state.currentPage + 1)

        if (this.refs.name.value == null && this.ref.category.value == null) {
            return null;
        } else {
            Axios.post(
                `http://localhost:2000/product/filter-product?page=${this.state.currentPage}`,
                obj
            )
                .then((res) => {
                    this.setState({
                        dataProd: res.data[0],
                        total_page: Math.ceil(
                            res.data[3].totalItems / res.data[2].per_page
                        ),
                        currentPage: 1,
                        // currentPage: this.state.currentPage,
                        pageNext: "onFilter",
                        pagePrev: "onFilter",
                        isLoading: false,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
            // if (this.statedataProd.length === 0) {
            //     this.setState({ notFound : true })
            // } else { this.setState({ notFound: false})}
        }
    };

    onSorting = () => {
        let name = this.refs.name.value;
        let category = this.refs.category.value;
        let sort = this.refs.sort.value;
        let obj;

        if (sort == "name-asc") {
            console.log("klik sort name-asc");
            obj = { name, category, orderBy: "product_name", sortBy: "asc" };
        } else if (sort === "name-desc") {
            console.log("klik sort name-desc");
            obj = { name, category, orderBy: "product_name", sortBy: "desc" };
        } else if (sort === "price-asc") {
            console.log("klik sort price-asc");
            obj = { name, category, orderBy: "product_price", sortBy: "asc" };
        } else if (sort === "price-desc") {
            console.log("klik sort price-desc");
            obj = { name, category, orderBy: "product_price", sortBy: "desc" };
        } else {
            return;
        }
        console.log("Hasil klik Sort", obj);

        Axios.post(
            `http://localhost:2000/product/sort-product?page=${this.state.currentPage}`,
            obj
        )
            .then((res) => {
                this.setState({
                    dataProd: res.data[0],
                    total_page: Math.ceil(res.data[3].totalItems / res.data[2].per_page),
                    currentPage: 1,
                    // currentPage: this.state.currentPage,
                    pageNext: "onSort",
                    pagePrev: "onSort",
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    onNext = () => {
        if (this.state.pageNext === "") {
            //paginate biasa
            Axios.post(
                `http://localhost:2000/product/get-product?page=${this.state.currentPage + 1
                }`
            )
                .then((res) => {
                    this.setState({
                        dataProd: res.data[0],
                        total_page: Math.ceil(
                            res.data[3].totalItems / res.data[2].per_page
                        ),
                        currentPage: this.state.currentPage + 1,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (this.state.pageNext === "onFilter") {
            //paginate hasil filter
            let name = this.refs.name.value;
            let category = this.refs.category.value;

            let obj = { name, category };

            Axios.post(
                `http://localhost:2000/product/filter-product?page=${this.state.currentPage + 1
                }`,
                obj
            )
                .then((res) => {
                    this.setState({
                        dataProd: res.data[0],
                        total_page: Math.ceil(
                            res.data[3].totalItems / res.data[2].per_page
                        ),
                        currentPage: this.state.currentPage + 1,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (this.state.pageNext === "onSort") {
            let name = this.refs.name.value;
            let category = this.refs.category.value;
            let sort = this.refs.sort.value;
            let obj;

            if (sort == "name-asc") {
                console.log("klik sort name-asc");
                obj = { name, category, orderBy: "product_name", sortBy: "asc" };
            } else if (sort === "name-desc") {
                console.log("klik sort name-desc");
                obj = { name, category, orderBy: "product_name", sortBy: "desc" };
            } else if (sort === "price-asc") {
                console.log("klik sort price-asc");
                obj = { name, category, orderBy: "product_price", sortBy: "asc" };
            } else if (sort === "price-desc") {
                console.log("klik sort price-desc");
                obj = { name, category, orderBy: "product_price", sortBy: "desc" };
            } else {
                return;
            }
            console.log("Hasil klik Sort", obj);

            Axios.post(
                `http://localhost:2000/product/sort-product?page=${this.state.currentPage + 1}`,
                obj
            )
                .then((res) => {
                    this.setState({
                        dataProd: res.data[0],
                        total_page: Math.ceil(
                            res.data[3].totalItems / res.data[2].per_page
                        ),
                        currentPage: this.state.currentPage + 1,
                        pageNext: "onSort",
                        pagePrev: "onSort",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    onPrevious = () => {
        if (this.state.pagePrev === "") {
            //paginate biasa
            Axios.post(
                `http://localhost:2000/product/get-product?page=${this.state.currentPage - 1
                }`
            )
                .then((res) => {
                    this.setState({
                        dataProd: res.data[0],
                        total_page: Math.ceil(
                            res.data[3].totalItems / res.data[2].per_page
                        ),
                        currentPage: this.state.currentPage - 1,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (this.state.pagePrev === "onFilter") {
            //paginate hasil filter
            let name = this.refs.name.value;
            let category = this.refs.category.value;

            let obj = { name, category };

            Axios.post(
                `http://localhost:2000/product/filter-product?page=${this.state.currentPage - 1
                }`,
                obj
            )
                .then((res) => {
                    this.setState({
                        dataProd: res.data[0],
                        total_page: Math.ceil(
                            res.data[3].totalItems / res.data[2].per_page
                        ),
                        currentPage: this.state.currentPage - 1,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (this.state.pagePrev === "onSort") {
            let name = this.refs.name.value;
            let category = this.refs.category.value;
            let sort = this.refs.sort.value;
            let obj;

            if (sort == "name-asc") {
                console.log("klik sort name-asc");
                obj = { name, category, orderBy: "product_name", sortBy: "asc" };
            } else if (sort === "name-desc") {
                console.log("klik sort name-desc");
                obj = { name, category, orderBy: "product_name", sortBy: "desc" };
            } else if (sort === "price-asc") {
                console.log("klik sort price-asc");
                obj = { name, category, orderBy: "product_price", sortBy: "asc" };
            } else if (sort === "price-desc") {
                console.log("klik sort price-desc");
                obj = { name, category, orderBy: "product_price", sortBy: "desc" };
            } else {
                return;
            }
            console.log("Hasil klik Sort", obj);

            Axios.post(
                `http://localhost:2000/product/sort-product?page=${this.state.currentPage - 1}`,
                obj
            )
                .then((res) => {
                    this.setState({
                        dataProd: res.data[0],
                        total_page: Math.ceil(
                            res.data[3].totalItems / res.data[2].per_page
                        ),
                        currentPage: this.state.currentPage - 1,
                        pageNext: "onSort",
                        pagePrev: "onSort",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    render() {
        const { dataProd, total_page } = this.state;
        console.log("current", this.state.currentPage)
        return (
            <div>
                <NavigationBar />
                <PageTitle pageTitle="Product List" />
                <Container>
                    <Row style={{ paddingTop: "30px" }}>
                        <Col sm={3}>
                            <Card style={style.filterCardWrapper}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <label className="myLabel">Filter & Sort</label>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <label className="myLabel">Category</label>
                                        <div className="mt-2">
                                            <Form.Select size="sm" aria-label="Floating label select example" style={{ width: '18vw' }} ref="category">
                                                <option value="">All Categories</option>
                                                {this.state.categories.map((item) => {
                                                    return (
                                                        <option value={item.category_name}>{item.category_name}</option>
                                                    );
                                                })}
                                            </Form.Select>

                                            <br></br>
                                            <label>Name :</label>
                                            <br></br>
                                            <Form.Control
                                                size="sm"
                                                type="text"
                                                placeholder="Enter product Name"
                                                style={{ width: "18vw" }}
                                                ref="name"
                                            />
                                            <Button
                                                style={{ marginTop: '3%' }}
                                                variant="outline-dark"
                                                size="sm"
                                                onClick={() => this.searchFilter()}
                                            >
                                                Filter Product
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {/* <label className="myLabel">Sort</label> */}
                                        <div className="mt-2">
                                            <Form.Select size="sm" aria-label="Floating label select example" style={{ width: '18vw' }} ref="sort" >
                                                <option value="">Sort By</option>
                                                <option value="name-asc" >name asc</option>
                                                <option value="name-desc">name desc</option>
                                                <option value="price-asc">price asc</option>
                                                <option value="price-desc">price desc</option>
                                            </Form.Select>
                                            <Button
                                                size="sm"
                                                style={{ marginTop: '3%' }}
                                                variant="outline-dark"
                                                onClick={() => this.onSorting()}
                                            >Sort Product
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>

                            </Card>
                        </Col>
                        <Col sm={9}>
                            <div style={style.productCardWrapper}>
                                {dataProd.map((item) => {
                                    return (
                                        <Col sm={3}>
                                            <Card style={style.productCard}>
                                                <div style={style.cardTopAction}></div>
                                                <div style={style.cardImageWrapper}>
                                                    {this.state.isLoading ? (
                                                        <Skeleton height={120} />
                                                    ) : (
                                                        <Card.Img
                                                            style={style.cardImage}
                                                            variant="top"
                                                            src={`http://localhost:2000/products/${item.productimg}`}
                                                        />
                                                    )}
                                                </div>
                                                <Button
                                                    variant="default"
                                                    style={style.addToWishlistBtn}
                                                >
                                                    <i className="far fa-heart"></i>
                                                </Button>
                                                <Card.Body
                                                    className="p-2 pb-2"
                                                    style={style.cardBody}
                                                    as={Link}
                                                    to={`/detail-product/${item.id_product}`}
                                                >
                                                    <div style={style.productTitleWrapper}>
                                                        <p style={style.productTitle}>
                                                            {this.state.isLoading ? (
                                                                <Skeleton />
                                                            ) : (
                                                                item.product_name
                                                            )}
                                                        </p>
                                                        <p style={style.productPrice}>
                                                            {this.state.isLoading ? (
                                                                <Skeleton />
                                                            ) : (
                                                                item.product_price.toLocaleString("id", {
                                                                    style: "currency",
                                                                    currency: "IDR",
                                                                })
                                                            )}
                                                        </p>
                                                    </div>
                                                </Card.Body>
                                                <div style={style.productCardFooter}>
                                                    <Button
                                                        variant="primary"
                                                        className="mr-1"
                                                        style={style.addToCartBtn}
                                                        onClick={this.onAddToCart}
                                                        block
                                                    >
                                                        add to card{" "}
                                                        <i className="fas fa-cart-plus ml-1"></i>
                                                    </Button>
                                                </div>
                                            </Card>
                                        </Col>
                                    );
                                })}
                            </div>
                            <div>
                                <Stack
                                    direction="horizontal"
                                    gap={3}
                                    style={{ justifyContent: "center", position: "relative" }}
                                >
                                    <Pagination>
                                        <Pagination.Prev
                                            disabled={this.state.currentPage === 1 ? true : false}
                                            onClick={() => this.onPrevious()}
                                        />
                                        <Pagination.Item disabled>
                                            {this.state.currentPage}
                                        </Pagination.Item>
                                        <Pagination.Item disabled>/</Pagination.Item>
                                        <Pagination.Item disabled>{total_page}</Pagination.Item>
                                        <Pagination.Next
                                            disabled={
                                                this.state.currentPage === this.state.total_page ||
                                                    this.state.total_page === 0
                                                    ? true
                                                    : false
                                            }
                                            onClick={() => this.onNext()}
                                        />
                                    </Pagination>
                                </Stack>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const style = {
    filterCardWrapper: {
        border: "none",
        border: "1px solid #F3F4F6",
        borderRadius: "5px",
        boxShadow: "0 1px 2px 0px rgba(0, 0, 0, 0.05)",
    },
    productWrapperCard: {
        margin: "none",
        border: "none",
        borderRadius: "5px",
    },
    noBorder: {
        border: "none",
        borderRadius: "5px",
    },

    //   new
    productCardWrapper: {
        display: "inline-block",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    productCard: {
        border: "1px solid #eaeaea",
        width: "95%",
        marginRight: "10px",
        marginBottom: "15px",
        boxSizing: "border-box",
        boxShadow: "0 4px 2px rgba(0, 0, 0, 0.01), 0 2px 2px 0 rgba(0, 0, 0, 0.06)",
    },
    cardBody: {
        textDecoration: "none",
    },
    cardTopAction: {
        position: "absolute",
        width: "88%",
        margin: "10px",
    },
    discountBadge: {
        fontSize: "10px",
        padding: "6px",
    },
    cardLoveBtn: {
        position: "absolute",
        float: "right",
        right: "0",
        backgroundColor: "#fff",
        borderRadius: "20px",
        padding: "1px 5px",
    },
    cardImageWrapper: {
        height: "150px",
    },
    cardImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    productTitleWrapper: {
        height: "40px",
        width: "150px",
    },
    productTitle: {
        fontSize: "14px",
        marginBottom: "0",
        fontWeight: "500",
        color: "#3A4047",
        textDecoration: "none",
        lineHeight: "1.4",
    },
    productQuickDetail: {
        fontSize: "14px",
        marginTop: "0",
    },
    badgeRating: {},
    badgeReviews: {
        fontWeight: "normal",
        backgroundColor: "#fff",
    },
    badgeOrders: {
        fontWeight: "normal",
        backgroundColor: "#fff",
    },
    productPrice: {
        fontSize: "12px",
        fontWeight: "600",
        color: "#F36E2D",
        marginBottom: "0px",
        marginTop: "3px",
    },

    productCardFooter: { margin: "10px" },
    addToCartBtn: {
        fontSize: "12px",
        fontWeight: "600",
        marginTop: "10px",
        width: "100%",
    },
    addToWishlistBtn: {
        padding: "6px 8px",
        fontSize: "12px",
        fontWeight: "600",
        borderRadius: "6px",
        position: "absolute",
        right: "0",
        marginTop: "135px",
        marginRight: "10px",
        backgroundColor: "#fff",
        boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    },
};

export default ProductPage;