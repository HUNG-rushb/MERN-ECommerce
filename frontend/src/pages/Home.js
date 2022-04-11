import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Home/Product";
import axios from "axios";

// import products from "./products1";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("http://localhost:2611/api/products");
      // const { data } = await axios.get("/api/products");

      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <React.Fragment>
      <h1>Latest Product</h1>
      <Row>
        {products.map((product, index) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} key={index} />
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default Home;
