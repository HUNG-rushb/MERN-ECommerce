import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/productControllers.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

// router.get(
//   "/",
//   expressAsyncHandler(async (req, res) => {
//     const products = await Product.find({});
//     res.json(products);
//   })
// );

// router.get(
//   "/:id",
//   expressAsyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id);

//     if (product) {
//       res.json(product);
//     } else {
//       res.status(404);
//       throw new Error("Product not found");
//     }
//   })
// );

export default router;
