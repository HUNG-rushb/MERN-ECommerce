import React from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Home/Product";

import products from "../data/products";

const Home = () => {
  return (
    <React.Fragment>
      <h1>Latest Product</h1>
      <Row>
        {products.map((product, index) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product product={product} key={index} />
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default Home;
