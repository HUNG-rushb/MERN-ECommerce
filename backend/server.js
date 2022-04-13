import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import colors from "colors";

import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const products = require("./data/products");

// Mongoose
connectDB();

// Express
const app = express();

// Enviroment Variable
dotenv.config();

// CORS
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

app.use("/api/products", productRoutes);

// Error
app.use(notFound);
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 2611;
app.listen(PORT, console.log(`Server on ${PORT}`));
