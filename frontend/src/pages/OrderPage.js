import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";

import Message from "../components/0. Layout/Message.js";
import Loader from "../components/0. Layout/Loader.js";

import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions.js";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants.js";

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const orderId = params.id;
  const [sdkReady, setSdkReady] = useState(false);

  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );

  const { loading: loadingDeliver, success: successDeliver } = useSelector(
    (state) => state.orderDeliver
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  if (!loading) {
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(
        "http://localhost:2611/api/config/paypal"
      );

      const newScript = document.createElement("script");
      newScript.type = "text/javascript";
      newScript.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      newScript.async = true;
      newScript.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(newScript);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    order,
    orderId,
    successPay,
    successDeliver,
  ]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = (paymentResult) => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order ${orderId}</h1>
      <Row>
        <Col md="8">
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Emai: </strong>
                <a href={`mailto:${order.user.mail}`}>{order.user.email}</a>
              </p>

              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>

              {order.isDelievered ? (
                <Message variant="success">
                  Delivered on {order.delivereddAt}
                </Message>
              ) : (
                <Message variant="danger">Not fuking delivered yet</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment method: </h2>

              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>

              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not fuking paid yet</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Ordder items:</h2>

              {order.orderItems.length === 0 ? (
                <Message>Order not found</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md="1">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md="4">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md="4">
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}

              {/* <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block"
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </Button>
              </ListGroup.Item> */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
