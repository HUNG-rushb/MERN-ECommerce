import React from "react";
import { Container } from "react-bootstrap";
import Footer from "./components/0. Layout/Footer";
import Header from "./components/0. Layout/Header";

import Home from "./pages/Home";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main className="py-3">
        <Container>
          <Home />
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
