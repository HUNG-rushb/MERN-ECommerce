import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Home/Product";
import Paginate from "../components/Home/Paginate";
import ProductCarousel from "../components/Home/ProductCarousel";

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
  const params = useParams();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  // console.log(products);

  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <React.Fragment>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}

      <h1>Latest Product</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product, index) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} key={index} />
              </Col>
            ))}
          </Row>

          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default Home;
