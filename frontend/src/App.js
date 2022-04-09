import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Footer from "./components/0. Layout/Footer";
import Header from "./components/0. Layout/Header";

// pages
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<Home />} exact />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
