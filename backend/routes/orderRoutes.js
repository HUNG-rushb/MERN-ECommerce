import express from "express";
import { addOrderedItems } from "../controllers/orderControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderedItems);

export default router;
