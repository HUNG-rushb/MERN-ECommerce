import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// import Message from "../components/0. Layout/Message.js";
// import Loader from "../components/0. Layout/Loader.js";
import FormContainer from "../components/0. Layout/FormContainer.js";
import CheckOutSteps from "../components/Checkout/CheckOutSteps.js";

import { saveShippingAddress } from "../actions/cartActions.js";

const ShippingPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(
    shippingAddress ? shippingAddress.address : ""
  );
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress ? shippingAddress.postalCode : ""
  );
  const [country, setCountry] = useState(
    shippingAddress ? shippingAddress.country : ""
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 />

      <h1>Shipping</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="mt-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city" className="mt-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your City"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode" className="mt-2">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country" className="mt-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" mt="5">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
