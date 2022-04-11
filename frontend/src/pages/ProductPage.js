import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import axios from "axios";

import Rating from "../components/Home/Rating";

// import products from "./products1";

const ProductPage = () => {
  const id = useParams().id;
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:2611/api/products/${id}`
      );
      // const { data } = await axios.get(
      //   `/api/products/${id}`
      // );

      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  return (
    <React.Fragment>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid></Image>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item variant="flush">
              <h2>{product.name}</h2>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={` ${product.numReviews} reviews`}
              ></Rating>
            </ListGroup.Item>

            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

            <ListGroup.Item>Description: ${product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  className="btn btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  {product.countInStock === 0
                    ? "Gonna Be In Stock Soon"
                    : "Add To Cart"}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ProductPage;