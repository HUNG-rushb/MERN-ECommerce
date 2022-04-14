import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Home/Product";

// Actions
import { listProducts } from "../actions/productActions";

// Components
import Loader from "../components/0. Layout/Loader";
import Message from "../components/0. Layout/Message";

const Home = () => {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get("http://localhost:2611/api/products");
  //     // const { data } = await axios.get("/api/products");

  //     setProducts(data);
  //   };

  //   fetchProducts();
  // }, []);

  // NEW
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  // console.log(products);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <React.Fragment>
      <h1>Latest Product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product, index) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} key={index} />
            </Col>
          ))}
        </Row>
      )}
    </React.Fragment>
  );
};

export default Home;
