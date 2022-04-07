import React from "react";
import Footer from "./components/0. Layout/Footer";
import Header from "./components/0. Layout/Header";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main className="py-3">
        <h1>Welcome to Hưng's shop!</h1>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
