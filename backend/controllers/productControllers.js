import expressAsyncHandler from "express-async-handler";
import Product from "../models/ProductModel.js";

const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed!" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProduct = expressAsyncHandler(async (req, res) => {
  const product = new Product({
    name: "test",
    price: 0,

    user: req.user.id,
    image: "/images/sample/jpg",
    brand: "",
    category: "",
    countInStock: "",
    numReviews: 0,
    description: "",
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

const updateProduct = expressAsyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.description = description;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found!!!");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
