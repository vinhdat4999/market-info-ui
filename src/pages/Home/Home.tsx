import React, {useEffect, useState} from "react";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import styles from "./Home.module.scss";
import {Col, Row, Select, Space, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {selectIsLoadingState, selectProductsState} from "../../redux-toolkit/product/productSelector";
import {getAllProducts} from "../../redux-toolkit/product/productThunk";
import Product from "../../components/Product/Product";
import Cart from "./Cart/Cart";

const {Option} = Select;

function Home(): React.JSX.Element {
    const dispatch: any = useDispatch();
    const products: any = useSelector(selectProductsState);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filter, setFilter] = useState<string>("default");
    const isLoading = useSelector(selectIsLoadingState);

    useEffect(() => {
        if (products.length === 0) {
            // Only fetch if there are no products in Redux store
            dispatch(getAllProducts());
        }
    }, [dispatch, products.length]);

    useEffect(() => {
        applyFilter(filter);
    }, [products, filter]);

    const applyFilter = (criteria: string) => {
        switch (criteria) {
            case "best-seller":
                setFilteredProducts([...products]?.sort((a: any, b: any) => b.soldNumber - a.soldNumber));
                break;
            case "price-asc":
                setFilteredProducts([...products]?.sort((a: any, b: any) => a.price - b.price));
                break;
            case "price-desc":
                setFilteredProducts([...products]?.sort((a: any, b: any) => b.price - a.price));
                break;
            case "discount":
                setFilteredProducts([...products]?.sort((a: any, b: any) => b.discount - a.discount));
                break;
            default:
                setFilteredProducts(products);
        }
    };

    const handleFilterChange = (value: string) => {
        setFilter(value);
    };

    return (
        <LayoutWrapper>
            {isLoading ?
                (
                    <Spin className={styles["spin"]} size={"large"}/>
                ) :
                (
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={17} className={styles["border-right"]}>
                            <Row justify="end" className={styles["filter-row"]} style={{marginBottom: 16}}>
                                <Select defaultValue="default" className={styles["sort"]} onChange={handleFilterChange}>
                                    <Option value="default">Mặc định</Option>
                                    <Option value="best-seller">Bán chạy</Option>
                                    <Option value="price-asc">Giá thấp</Option>
                                    <Option value="price-desc">Giá cao</Option>
                                    <Option value="discount">Giảm giá nhiều</Option>
                                </Select>
                            </Row>

                            <Row gutter={[16, 16]} className={styles["product-list"]}>
                                {filteredProducts?.map((product: any) => (
                                    <Col key={product.id} xs={12} sm={12} md={8} lg={6} xl={4}>
                                        <Space style={{overflow: "hidden"}}>
                                            <Product
                                                key={product.id}
                                                productId={product.productId}
                                                name={product.name}
                                                thumbnailPath={product.thumbnailPath}
                                                price={product.price}
                                                discount={product.discount}
                                            />
                                        </Space>
                                    </Col>
                                ))}
                            </Row>
                        </Col>

                        <Col xs={24} sm={24} md={7} className={styles["cart-container"]}>
                            <Cart allProducts={products}/>
                        </Col>
                    </Row>
                )}
        </LayoutWrapper>
    );
}

export default Home;
