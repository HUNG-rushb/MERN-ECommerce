import express from "express";
import {
  addOrderedItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from "../controllers/orderControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderedItems);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
