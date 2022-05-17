import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Footer from "./components/0. Layout/Footer";
import Header from "./components/0. Layout/Header";

// pages
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import UserListPage from "./pages/UsersListPage";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<Home />} exact />

              <Route path="/register" element={<RegisterPage />} />

              <Route path="/login" element={<LoginPage />} />

              <Route path="/profile" element={<ProfilePage />} />

              <Route path="/product/:id" element={<ProductPage />} />

              <Route path="/cart" element={<CartPage />} />
              <Route path="/cart/:id" element={<CartPage />} exact />

              <Route path="/shipping" element={<ShippingPage />} />

              <Route path="/payment" element={<PaymentPage />} />

              <Route path="/placeorder" element={<PlaceOrderPage />} />

              <Route path="/order/:id" element={<OrderPage />} exact />

              <Route path="/admin/userlist" element={<UserListPage />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
