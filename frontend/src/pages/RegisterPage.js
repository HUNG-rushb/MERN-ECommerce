import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/0. Layout/Message.js";
import Loader from "../components/0. Layout/Loader.js";
import LoginForm from "../components/Login/LoginForm.js";

import { register } from "../actions/userActions";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMesage] = useState(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMesage("Passwords do not match lmao!");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <LoginForm>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}

      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="mt-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="mt-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="mt-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mt-2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-3">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already Have An Account?{" "}
          <Link
            // to={
            //   redirect
            //     ? `http://localhost:2611/login?redirect=${redirect}`
            //     : "/login"
            // }
            to="/login"
          >
            Sign In
          </Link>
        </Col>
      </Row>
    </LoginForm>
  );
};

export default RegisterPage;
