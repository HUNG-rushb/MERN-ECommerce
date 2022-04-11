const express = require("express");

const products = require("./data/products");

const app = express();

// CORS
const cors = require("cors");
app.use(cors());
// https://enable-cors.org/server_expressjs.html
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:2611"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// Proxy middleware
// https://create-react-app.dev/docs/proxying-api-requests-in-development/
// const { createProxyMiddleware } = require("http-proxy-middleware");
// app.use(
//   "/api",
//   createProxyMiddleware({
//     target: "http://localhost:2611",
//     changeOrigin: true,
//   })
// );

// API
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(2611, console.log("Server on 2611"));
