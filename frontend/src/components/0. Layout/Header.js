// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

import { logout } from "../../actions/userActions";
// import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
// import style from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            Hưng's Shop
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/cart">
                <i className="fas fa-shopping-cart" /> Cart
              </Nav.Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item as={Link} to="/profile">
                    {/* <Nav.Link as={Link} to="/profile"> */}
                    Profile
                    {/* </Nav.Link> */}
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <i className="fas fa-user" /> Sign in
                </Nav.Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminame">
                  <NavDropdown.Item as={Link} to="/admin/userlist">
                    {/* <Nav.Link as={Link} to="/profile"> */}
                    Our Users
                    {/* </Nav.Link> */}
                  </NavDropdown.Item>

                  <NavDropdown.Item as={Link} to="/admin/productlist">
                    {/* <Nav.Link as={Link} to="/profile"> */}
                    Our Products
                    {/* </Nav.Link> */}
                  </NavDropdown.Item>

                  <NavDropdown.Item as={Link} to="/admin/orderlist">
                    {/* <Nav.Link as={Link} to="/profile"> */}
                    Orders
                    {/* </Nav.Link> */}
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
